import React from 'react'
import { Table } from './Table'

export function ResponsiveTableExample() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">
          New Table Component (Recommended)
        </h3>
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Header>Feature</Table.Header>
              <Table.Header>Description</Table.Header>
              <Table.Header>Benefits</Table.Header>
              <Table.Header>Implementation</Table.Header>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell className="font-semibold">
                Responsive Design
              </Table.Cell>
              <Table.Cell>
                Automatically adapts to different screen sizes with horizontal
                scrolling on mobile
              </Table.Cell>
              <Table.Cell>
                Better mobile experience, no content cutoff
              </Table.Cell>
              <Table.Cell>CSS overflow-x auto with touch scrolling</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="font-semibold">Touch Scrolling</Table.Cell>
              <Table.Cell>
                Smooth touch-based horizontal scrolling on mobile devices
              </Table.Cell>
              <Table.Cell>Native mobile feel, better usability</Table.Cell>
              <Table.Cell>-webkit-overflow-scrolling: touch</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">
          Legacy inline-table (Auto-wrapped)
        </h3>
        <table className="inline-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Description</th>
              <th>Default</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>responsive</td>
              <td>boolean</td>
              <td>Enable responsive behavior with horizontal scrolling</td>
              <td>true</td>
            </tr>
            <tr>
              <td>touchScroll</td>
              <td>boolean</td>
              <td>Enable smooth touch scrolling on mobile</td>
              <td>true</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ResponsiveTableExample
