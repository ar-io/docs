import Link from 'next/link'
import { SquareArrowOutUpRight } from 'lucide-react'
import clsx from 'clsx'

function ExternalLink({ 
  href, 
  children,
  className 
}: { 
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={clsx(
        "inline-flex items-center gap-1 group",
        className
      )}
    >
      {children}
      <SquareArrowOutUpRight className="w-4 h-4 transition-colors group-hover:text-zinc-900 dark:group-hover:text-white" />
    </Link>
  )
}

export default ExternalLink
