import React from 'react'
import clsx from 'clsx'

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  overrideContainerClasses?: boolean
  containerStyle?: React.CSSProperties
  scrollContainerClassName?: string
  style?: React.CSSProperties
}

export function Table({
  children,
  className,
  containerClassName,
  overrideContainerClasses = false,
  containerStyle,
  scrollContainerClassName,
  style,
  ...props
}: TableProps) {
  // Apply all style props directly to the table element
  const tableStyle = {
    minWidth: '600px', // Default minWidth
    ...style, // Allow override of minWidth and other styles
  }

  // Determine container classes based on override preference
  const containerClasses = overrideContainerClasses
    ? containerClassName || ''
    : clsx('my-6 flex w-full justify-center', containerClassName)

  return (
    <div className={containerClasses} style={containerStyle}>
      <div
        className={clsx(
          'w-full overflow-x-auto rounded-lg border border-zinc-200 shadow-sm dark:border-zinc-700',
          scrollContainerClassName,
        )}
      >
        {/* Mobile scroll indicator - Top */}
        <div className="block border-b border-zinc-200 py-2 text-center text-xs text-zinc-500 sm:hidden dark:border-zinc-700 dark:text-zinc-400">
          ← Swipe to see more →
        </div>
        <div className="inline-block">
          <table
            className={clsx('w-full border-collapse', className)}
            style={tableStyle}
            {...props}
          >
            {children}
          </table>
        </div>
        {/* Mobile scroll indicator - Bottom */}
        <div className="block border-t border-zinc-200 py-2 text-center text-xs text-zinc-500 sm:hidden dark:border-zinc-700 dark:text-zinc-400">
          ← Swipe to see more →
        </div>
      </div>
    </div>
  )
}

interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode
  className?: string
}

export function TableHead({ children, className, ...props }: TableHeadProps) {
  return (
    <thead
      className={clsx(
        'border-b border-zinc-300 dark:border-zinc-600',
        className,
      )}
      {...props}
    >
      {children}
    </thead>
  )
}

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode
  className?: string
}

export function TableBody({ children, className, ...props }: TableBodyProps) {
  return (
    <tbody
      className={clsx(
        '[&>tr:nth-child(even)]:bg-zinc-50 dark:[&>tr:nth-child(even)]:bg-zinc-800 [&>tr:nth-child(odd)]:bg-white dark:[&>tr:nth-child(odd)]:bg-zinc-900',
        className,
      )}
      {...props}
    >
      {children}
    </tbody>
  )
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode
  className?: string
}

export function TableRow({ children, className, ...props }: TableRowProps) {
  return (
    <tr
      className={clsx(
        'border-b border-zinc-200 last:border-b-0 dark:border-zinc-700',
        className,
      )}
      {...props}
    >
      {children}
    </tr>
  )
}

interface TableHeaderProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
  className?: string
}

export function TableHeader({
  children,
  className,
  ...props
}: TableHeaderProps) {
  return (
    <th
      className={clsx(
        'px-2 py-2 text-left text-xs font-semibold text-zinc-900 sm:px-3 sm:py-3 sm:text-sm md:px-4 md:py-4 dark:text-zinc-100',
        className,
      )}
      {...props}
    >
      {children}
    </th>
  )
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
  className?: string
}

export function TableCell({ children, className, ...props }: TableCellProps) {
  return (
    <td
      className={clsx(
        'hyphens-auto break-words px-2 py-2 text-xs text-zinc-700 sm:px-3 sm:py-3 sm:text-sm md:px-4 md:py-4 md:text-base dark:text-zinc-300',
        className,
      )}
      {...props}
    >
      {children}
    </td>
  )
}

// Export compound component
Table.Head = TableHead
Table.Body = TableBody
Table.Row = TableRow
Table.Header = TableHeader
Table.Cell = TableCell

export default Table
