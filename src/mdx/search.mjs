import { slugifyWithCounter } from '@sindresorhus/slugify'
import glob from 'fast-glob'
import * as fs from 'fs'
import { toString } from 'mdast-util-to-string'
import * as path from 'path'
import { remark } from 'remark'
import remarkMdx from 'remark-mdx'
import { createLoader } from 'simple-functional-loader'
import { filter } from 'unist-util-filter'
import { SKIP, visit } from 'unist-util-visit'
import * as url from 'url'

const __filename = url.fileURLToPath(import.meta.url)
const processor = remark().use(remarkMdx).use(extractSections)
const slugify = slugifyWithCounter()

function isObjectExpression(node) {
  return (
    node.type === 'mdxTextExpression' &&
    node.data?.estree?.body?.[0]?.expression?.type === 'ObjectExpression'
  )
}

function excludeObjectExpressions(tree) {
  return filter(tree, (node) => !isObjectExpression(node))
}

function extractSections() {
  return (tree, { sections }) => {
    slugify.reset()

    let currentSection = null

    visit(tree, (node) => {
      if (node.type === 'heading') {
        let content = toString(excludeObjectExpressions(node))
        let hash = node.depth === 1 ? null : slugify(content)
        currentSection = [content, hash, []]
        sections.push(currentSection)
        return SKIP
      }

      if (node.type === 'text' || node.type === 'paragraph' || node.type === 'code') {
        let content = toString(excludeObjectExpressions(node))
        if (content.trim()) {
          if (!currentSection) {
            currentSection = ['', null, []]
            sections.push(currentSection)
          }
          currentSection[2].push(content)
        }
        return SKIP
      }
    })
  }
}

export default function Search(nextConfig = {}) {
  let cache = new Map()

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.push({
        test: __filename,
        use: [
          createLoader(function () {
            let appDir = path.resolve('./src/app')
            this.addContextDependency(appDir)

            let files = glob.sync('**/*.mdx', { cwd: appDir })
            let data = files.map((file) => {
              let url = '/' + file.replace(/(^|\/)page\.mdx$/, '')
              let mdx = fs.readFileSync(path.join(appDir, file), 'utf8')

              let sections = []

              if (cache.get(file)?.[0] === mdx) {
                sections = cache.get(file)[1]
              } else {
                let vfile = { value: mdx, sections }
                processor.runSync(processor.parse(vfile), vfile)
                cache.set(file, [mdx, sections])
              }

              return { url, sections }
            })

            return `
              import FlexSearch from 'flexsearch'

              let sectionIndex = new FlexSearch.Document({
                tokenize: 'full',
                document: {
                  id: 'url',
                  index: ['content', 'title'],
                  store: ['title', 'pageTitle'],
                },
                context: {
                  resolution: 9,
                  depth: 2,
                  bidirectional: true
                },
                optimize: true,
                cache: true
              })

              let data = ${JSON.stringify(data)}

              for (let { url, sections } of data) {
                for (let [title, hash, content] of sections) {
                  sectionIndex.add({
                    url: url + (hash ? ('#' + hash) : ''),
                    title,
                    content: [title, ...content].join('\\n'),
                    pageTitle: hash ? sections[0][0] : undefined,
                  })
                }
              }

              export function search(query, options = {}) {
                let results = []
                
                // Search in both title and content
                let titleResults = sectionIndex.search(query, {
                  ...options,
                  enrich: true,
                  index: 'title'
                })
                
                let contentResults = sectionIndex.search(query, {
                  ...options,
                  enrich: true,
                  index: 'content'
                })

                // Combine and deduplicate results
                let seen = new Set()
                
                function addResults(searchResults, boost = 1) {
                  if (searchResults.length === 0) return
                  
                  searchResults[0].result.forEach((item) => {
                    if (!seen.has(item.id)) {
                      seen.add(item.id)
                      results.push({
                        url: item.id,
                        title: item.doc.title,
                        pageTitle: item.doc.pageTitle,
                        score: item.score * boost
                      })
                    }
                  })
                }

                // Prioritize title matches
                addResults(titleResults, 1.5)
                addResults(contentResults, 1)

                // Sort by score
                return results.sort((a, b) => b.score - a.score)
              }
            `
          }),
        ],
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  })
}
