#!/usr/bin/env node

const fs = require('fs')
const fg = require('fast-glob')
const path = require('path')

// Configuration
const DEV_SERVER_URL = 'http://localhost:3000'
const WAIT_TIME_MS = 2000 // Time to wait for dev server to reload

// Function to safely add Table import only at the top level
function addTableImport(content) {
  // Check if Table import already exists
  if (content.includes("import { Table } from '@/components/Table'")) {
    return content
  }

  // Only add if there are tables to convert
  if (!content.includes('className="inline-table"')) {
    return content
  }

  const lines = content.split('\n')
  let importSectionEnd = -1
  let inCodeBlock = false

  // Find the end of the import section more carefully
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    // Track if we're inside a code block
    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock
      continue
    }

    // Skip lines inside code blocks
    if (inCodeBlock) {
      continue
    }

    // If we find an import statement at the top level, update the end
    if (trimmed.startsWith('import ') && trimmed.includes(' from ')) {
      importSectionEnd = i
    }
    // Stop at the first significant non-import content
    else if (
      trimmed &&
      !trimmed.startsWith('//') &&
      !trimmed.startsWith('/*') &&
      !trimmed.startsWith('*') &&
      trimmed !== ''
    ) {
      break
    }
  }

  if (importSectionEnd >= 0) {
    // Insert the Table import after the last import
    lines.splice(
      importSectionEnd + 1,
      0,
      "import { Table } from '@/components/Table'",
    )
  } else {
    // No imports found, add at the very beginning
    lines.unshift("import { Table } from '@/components/Table'")
  }

  return lines.join('\n')
}

// Function to convert a single table
function convertTable(tableHtml) {
  let result = '<Table>\n'

  // Extract thead
  const theadMatch = tableHtml.match(/<thead>[\s\S]*?<\/thead>/)
  if (theadMatch) {
    result += '  <Table.Head>\n'

    const headerRows = theadMatch[0].match(/<tr[^>]*>[\s\S]*?<\/tr>/g)
    if (headerRows) {
      headerRows.forEach((row) => {
        result += '    <Table.Row>\n'

        const headers = row.match(/<th[^>]*>[\s\S]*?<\/th>/g)
        if (headers) {
          headers.forEach((header) => {
            const content = header
              .replace(/<th[^>]*>/, '')
              .replace(/<\/th>/, '')
              .trim()
            result += `      <Table.Header>${content}</Table.Header>\n`
          })
        }

        result += '    </Table.Row>\n'
      })
    }

    result += '  </Table.Head>\n'
  }

  // Extract tbody
  const tbodyMatch = tableHtml.match(/<tbody>[\s\S]*?<\/tbody>/)
  if (tbodyMatch) {
    result += '  <Table.Body>\n'

    const bodyRows = tbodyMatch[0].match(/<tr[^>]*>[\s\S]*?<\/tr>/g)
    if (bodyRows) {
      bodyRows.forEach((row) => {
        result += '    <Table.Row>\n'

        const cells = row.match(/<(td|th)[^>]*>[\s\S]*?<\/(td|th)>/g)
        if (cells) {
          cells.forEach((cell, index) => {
            const content = cell
              .replace(/<(td|th)[^>]*>/, '')
              .replace(/<\/(td|th)>/, '')
              .trim()

            const isFirstCell = index === 0 && cell.startsWith('<th')
            const className = isFirstCell ? ' className="font-semibold"' : ''

            // Handle content with proper formatting
            if (content.includes('\n')) {
              const indentedContent = content
                .split('\n')
                .map((line) => (line.trim() ? `        ${line.trim()}` : ''))
                .join('\n')
              result += `      <Table.Cell${className}>\n${indentedContent}\n      </Table.Cell>\n`
            } else {
              result += `      <Table.Cell${className}>${content}</Table.Cell>\n`
            }
          })
        }

        result += '    </Table.Row>\n'
      })
    }

    result += '  </Table.Body>\n'
  }

  result += '</Table>'
  return result
}

// Function to convert all tables in content
function convertTables(content) {
  let result = content

  // Pattern 1: JSX wrapped tables {<div><table>...</table></div>}
  result = result.replace(
    /{[\s\n]*<div[^>]*>[\s\n]*<table[^>]*className="inline-table"[^>]*>[\s\S]*?<\/table>[\s\n]*<\/div>[\s\n]*}/g,
    (match) => {
      const tableMatch = match.match(
        /<table[^>]*className="inline-table"[^>]*>[\s\S]*?<\/table>/,
      )
      if (tableMatch) {
        return convertTable(tableMatch[0])
      }
      return match
    },
  )

  // Pattern 2: Regular div wrapped tables
  result = result.replace(
    /<div[^>]*>[\s\n]*<table[^>]*className="inline-table"[^>]*>[\s\S]*?<\/table>[\s\n]*<\/div>/g,
    (match) => {
      const tableMatch = match.match(
        /<table[^>]*className="inline-table"[^>]*>[\s\S]*?<\/table>/,
      )
      if (tableMatch) {
        return convertTable(tableMatch[0])
      }
      return match
    },
  )

  // Pattern 3: Standalone tables
  result = result.replace(
    /<table[^>]*className="inline-table"[^>]*>[\s\S]*?<\/table>/g,
    (match) => {
      return convertTable(match)
    },
  )

  return result
}

// Function to convert file path to URL path
function filePathToUrl(filePath) {
  // Convert src/app/some/path/page.mdx to /some/path
  const relativePath = filePath.replace('src/app/', '').replace('/page.mdx', '')

  // Handle root page
  if (relativePath === 'page.mdx' || relativePath === '') {
    return '/'
  }

  return `/${relativePath}`
}

// Function to test a page
async function testPage(url) {
  try {
    console.log(`    🌐 Testing: ${DEV_SERVER_URL}${url}`)

    const response = await fetch(`${DEV_SERVER_URL}${url}`, {
      method: 'GET',
      timeout: 10000, // 10 second timeout
    })

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
      }
    }

    const text = await response.text()

    // Check for common error indicators
    if (
      text.includes('Application error') ||
      text.includes('Error: ') ||
      text.includes('SyntaxError') ||
      text.includes('ReferenceError') ||
      text.includes('TypeError')
    ) {
      return {
        success: false,
        error: 'Page contains JavaScript errors',
      }
    }

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: `Network error: ${error.message}`,
    }
  }
}

// Function to wait for a specified time
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Function to process a single file
async function processFile(filePath) {
  try {
    console.log(`\n📄 Processing: ${filePath}`)

    const originalContent = fs.readFileSync(filePath, 'utf8')

    // Skip if no tables to convert
    if (!originalContent.includes('className="inline-table"')) {
      console.log(`  ℹ️  No tables found, skipping`)
      return { success: true, skipped: true }
    }

    // Convert the file
    let newContent = addTableImport(originalContent)
    newContent = convertTables(newContent)

    if (newContent === originalContent) {
      console.log(`  ⚠️  No changes made`)
      return { success: true, skipped: true }
    }

    // Write the updated content
    fs.writeFileSync(filePath, newContent, 'utf8')
    console.log(`  ✅ File converted, waiting for dev server reload...`)

    // Wait for dev server to reload
    await wait(WAIT_TIME_MS)

    // Test the corresponding page
    const url = filePathToUrl(filePath)
    const testResult = await testPage(url)

    if (testResult.success) {
      console.log(`  🎉 Page test passed!`)
      return { success: true, converted: true }
    } else {
      console.log(`  ❌ Page test failed: ${testResult.error}`)
      console.log(`  🔄 Reverting file...`)

      // Revert the file
      fs.writeFileSync(filePath, originalContent, 'utf8')

      return {
        success: false,
        error: testResult.error,
        reverted: true,
      }
    }
  } catch (error) {
    console.error(`  ❌ Error processing file: ${error.message}`)
    return { success: false, error: error.message }
  }
}

// Function to check if dev server is running
async function checkDevServer() {
  try {
    const response = await fetch(DEV_SERVER_URL, { timeout: 5000 })
    return response.ok
  } catch (error) {
    return false
  }
}

// Main function
async function main() {
  console.log(
    '🚀 Converting HTML tables to Table component (incremental approach)...',
  )

  // Check if dev server is running
  console.log(`🔍 Checking dev server at ${DEV_SERVER_URL}...`)
  const serverRunning = await checkDevServer()

  if (!serverRunning) {
    console.error(`❌ Dev server is not running at ${DEV_SERVER_URL}`)
    console.error(`   Please start the dev server with: npm run dev`)
    process.exit(1)
  }

  console.log(`✅ Dev server is running`)
  console.log(`📝 Processing page.mdx files one by one...\n`)

  // Find all page.mdx files
  const files = await fg('src/**/page.mdx')
  console.log(`📁 Found ${files.length} page.mdx files`)

  let stats = {
    total: files.length,
    converted: 0,
    skipped: 0,
    failed: 0,
    reverted: 0,
  }

  // Process each file one by one
  for (const file of files) {
    const result = await processFile(file)

    if (result.success) {
      if (result.converted) {
        stats.converted++
      } else if (result.skipped) {
        stats.skipped++
      }
    } else {
      stats.failed++
      if (result.reverted) {
        stats.reverted++
      }
    }

    // Small pause between files
    await wait(500)
  }

  console.log(`\n📊 Conversion Summary:`)
  console.log(`   Total files: ${stats.total}`)
  console.log(`   Converted: ${stats.converted}`)
  console.log(`   Skipped: ${stats.skipped}`)
  console.log(`   Failed: ${stats.failed}`)
  console.log(`   Reverted: ${stats.reverted}`)

  if (stats.converted > 0) {
    console.log(`\n🎉 Successfully converted ${stats.converted} files!`)
    console.log(`✨ All converted tables are mobile-responsive`)
  }

  if (stats.failed > 0) {
    console.log(
      `\n⚠️  ${stats.failed} files failed conversion and were reverted`,
    )
    console.log(`   Check the errors above for details`)
  } else {
    console.log(`\nℹ️  All conversions were successful!`)
  }
}

// Run the script
main().catch(console.error)
