'use client'
import { SquareArrowOutUpRight } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { AnimatePresence, motion, useIsPresent } from 'framer-motion'

import { Button } from '@/components/Button'
import { useIsInsideMobileNavigation } from '@/components/MobileNavigation'
import { useSectionStore } from '@/components/SectionProvider'
import { Tag } from '@/components/Tag'
import { remToPx } from '@/lib/remToPx'

import { mainNavigation, secondaryNavigation } from '@/navConfigs/sidebarConfig'

import { ChevronDown, ChevronRight } from 'lucide-react'

function useInitialValue<T>(value: T, condition = true) {
  let initialValue = useRef(value).current
  return condition ? initialValue : value
}

export interface NavGroup {
  title: string
  links: Array<{
    title: string
    href?: string
    children?: Array<{
      title: string
      href?: string
      children?: Array<{
        title: string
        href?: string
      }>
    }>
  }>
}

function TopLevelNavItem({
  href,
  children,
  target = '_self',
  className
}: {
  href: string
  children: React.ReactNode
  target: string
  className?: string
}) {
  return (
    <li>
      <Link
        href={href}
        target={target}
        className='flex font-extrabold cursor-pointer justify-between gap-2 py-1 pr-3 text-lg text-zinc-900 hover:text-zinc-900 dark:text-white dark:hover:text-emerald-600'
      >
        {children}
      </Link>
    </li>
  )
}

function NavLink({
  href,
  children,
  tag,
  active = false,
  isAnchorLink = false,
}: {
  href?: string
  children: React.ReactNode
  tag?: string
  active?: boolean
  isAnchorLink?: boolean
}) {
  if (!href) return null

  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      // Items without children
      className={clsx(
        'flex cursor-pointer justify-between gap-2 py-1 pr-3 text-sm transition',
        isAnchorLink ? 'pl-9' : 'pl-4',
        active
          ? //active item
            'font-bold text-zinc-900 underline dark:text-white'
          : // non-active items
            'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-emerald-600 ',
      )}
    >
      <span className="truncate">{children}</span>
      {tag && (
        <Tag variant="small" color="zinc">
          {tag}
        </Tag>
      )}
    </Link>
  )
}

function normalizePath(path: string): string {
  return path.endsWith('/') ? path : `${path}/`
}

function isLinkActive(
  link: { href?: string; children?: { href?: string; children?: any[] }[] },
  pathname: string,
): boolean {
  const normalizedHref = link.href ? normalizePath(link.href) : null
  const normalizedPathname = normalizePath(pathname)

  if (
    normalizedPathname &&
    normalizedHref &&
    normalizedPathname === normalizedHref
  ) {
    // console.log("found matching link ", normalizedHref)
  }

  return (
    normalizedHref === normalizedPathname ||
    (link.children?.some((child) => isLinkActive(child, pathname)) ?? false)
  )
}

function VisibleSectionHighlight({
  group,
  pathname,
}: {
  group: NavGroup
  pathname: string
}) {
  const [highlightTop, setHighlightTop] = useState(0)
  const [highlightHeight, setHighlightHeight] = useState()
  let [sections, visibleSections] = useInitialValue(
    [
      useSectionStore((s) => s.sections),
      useSectionStore((s) => s.visibleSections),
    ],
    useIsInsideMobileNavigation(),
  )

  let isPresent = useIsPresent()
  let firstVisibleSectionIndex = Math.max(
    0,
    [{ id: '_top' }, ...sections].findIndex(
      (section) => section.id === visibleSections[0],
    ),
  )
  let itemHeight = remToPx(2)
  let height = isPresent
    ? Math.max(1, visibleSections.length) * itemHeight
    : itemHeight

  // useEffect(() => {
  //   const updateHighlightPosition = () => {
  //     const activeLink = findActiveLink(group.links, pathname)
  //     if (activeLink) {
  //       const linkElement = document.querySelector(`[href='${activeLink.link.href}']`)
  //       if (linkElement) {
  //         const offsetTop = linkElement.getBoundingClientRect().top + window.scrollY
  //         const parentOffsetTop = linkElement.closest('.relative')?.getBoundingClientRect().top ?? 0
  //         setHighlightTop(offsetTop - parentOffsetTop)
  //       } else {
  //         const linkIndex = activeLink.index
  //         setHighlightTop(linkIndex * itemHeight + firstVisibleSectionIndex * itemHeight)
  //       }
  //       setHighlightHeight(height)
  //     }
  //   }

  //   updateHighlightPosition()
  //   window.addEventListener('scroll', updateHighlightPosition)
  //   window.addEventListener('resize', updateHighlightPosition)
  //   return () => {
  //     window.removeEventListener('scroll', updateHighlightPosition)
  //     window.removeEventListener('resize', updateHighlightPosition)
  //   }
  // }, [pathname, sections, visibleSections])

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"
      style={{ borderRadius: 8, height: highlightHeight, top: highlightTop }}
    />
  )
}

function findActiveLink(
  links: Array<{ href?: string; children?: any[] }>,
  pathname: string,
  currentIndex = 0,
): { link: { href?: string; children?: any[] }; index: number } | null {
  let activeLink: {
    link: { href?: string; children?: any[] }
    index: number
  } | null = null

  const normalizedPathname = normalizePath(pathname)

  for (let i = 0; i < links.length; i++) {
    const link = links[i]
    const normalizedHref = link.href ? normalizePath(link.href) : null

    if (
      normalizedHref === normalizedPathname ||
      isLinkActive(link, normalizedPathname)
    ) {
      activeLink = { link, index: currentIndex + i }
    }

    if (link.children) {
      const childActiveLink = findActiveLink(
        link.children,
        pathname,
        currentIndex + i + 1,
      )
      if (childActiveLink) {
        return childActiveLink
      }
    }

    if (activeLink) {
      return activeLink
    }
  }

  return activeLink
}

function ActivePageMarker({
  group,
  pathname,
}: {
  group: NavGroup
  pathname: string
}) {
  const itemHeight = remToPx(2)
  const offset = remToPx(0.25)

  const activeLink = findActiveLink(group.links, pathname)

  let top = activeLink ? offset + activeLink.index * itemHeight : 0

  return (
    <motion.div
      layout
      className="absolute left-2 h-6 w-px bg-emerald-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      style={{ top }}
    />
  )
}

function NavigationGroup({
  group,
  className,
}: {
  group: NavGroup
  className?: string
}) {
  let isInsideMobileNavigation = useIsInsideMobileNavigation()
  let [pathname, sections] = useInitialValue(
    [usePathname(), useSectionStore((s) => s.sections)],
    isInsideMobileNavigation,
  )
  const isPathActive = (
    link: { href?: string; children?: any[] },
    currentPath: string,
  ): boolean => {
    if (link.href && normalizePath(link.href) === normalizePath(currentPath)) {
      return true
    }

    if (link.children) {
      return link.children.some((child) => isPathActive(child, currentPath))
    }

    return false
  }
  const [collapsedState, setCollapsedState] = useState<Record<string, boolean>>(
    () => {
      const initialState: Record<string, boolean> = {}

      const setInitialStates = (
        links: Array<{ title: string; href?: string; children?: any[] }>,
        level: number,
      ) => {
        links.forEach((link) => {
          if (level === 0) {
            initialState[link.title] = true
          } else {
            const isActive = isPathActive(link, pathname)

            if (level === 1) {
              initialState[link.title] = !isActive
            } else {
              initialState[link.title] = !isActive
            }
          }

          if (link.children) {
            setInitialStates(link.children, level + 1)
          }
        })
      }

      setInitialStates(group.links, 0)
      return initialState
    },
  )

  const toggleCollapse = (key: string) => {
    setCollapsedState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }))
  }

  useEffect(() => {
    group.links.forEach((link) => {
      const processLink = (currentLink: any) => {
        if (currentLink.href === pathname && sections.length > 0) {
          setCollapsedState((prev) => ({
            ...prev,
            [currentLink.title]: false,
          }))
        }
        if (currentLink.children) {
          currentLink.children.forEach(processLink)
        }
      }
      processLink(link)
    })
  }, [pathname, sections, group.links])

  const mapSections = (link: any, level = 0) => {
    const isLinkActiveAndHasSections =
      link.href === pathname && sections.length > 0

    return (
      <>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {link.href ? (
              <NavLink href={link.href} active={isLinkActive(link, pathname)}>
                {link.title}
              </NavLink>
            ) : (
              // Items with children
              <span
                className={clsx(
                  'cursor-pointer pl-4 text-sm',
                  isPathActive(link, pathname)
                    ? 'font-bold text-zinc-900 dark:text-white' // Active state
                    : 'text-zinc-900 dark:text-zinc-400', // Inactive state
                )}
              >
                {link.title}
              </span>
            )}
            {isLinkActiveAndHasSections && (
              //chevrons
              <span
                className="ml-2 cursor-pointer text-sm text-zinc-900 dark:text-white"
                onClick={() => toggleCollapse(link.title)}
              >
                {collapsedState[link.title] ? (
                  <ChevronRight />
                ) : (
                  <ChevronDown />
                )}
              </span>
            )}
          </div>
          {link.children && (
            // chevrons
            <span
              className="ml-2 cursor-pointer text-sm text-zinc-900 dark:text-white"
              onClick={() => toggleCollapse(link.title)}
            >
              {collapsedState[link.title] ? <ChevronRight /> : <ChevronDown />}
            </span>
          )}
        </div>
        {!collapsedState[link.title] && isLinkActiveAndHasSections && (
          <motion.ul
            role="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.1 } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            {sections.map((section) => (
              <li key={section.id}>
                <NavLink
                  href={`${link.href}#${section.id}`}
                  tag={section.tag}
                  isAnchorLink
                >
                  {section.title}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        )}
        {!collapsedState[link.title] && link.children && (
          <ul role="list" className="pl-4">
            {link.children.map((child: any) => (
              <li key={child.href ?? child.title} className="mt-2">
                {mapSections(child, level + 1)}
              </li>
            ))}
          </ul>
        )}
      </>
    )
  }

  let isActiveGroup = group.links.some((link) => isLinkActive(link, pathname))

  return (
    <li className={clsx('relative mt-6', className)}>
      <motion.h2
        layout="position"
        className="flex cursor-pointer items-center justify-between text-lg font-extrabold text-zinc-900 dark:text-white"
        onClick={() => toggleCollapse(group.title)}
      >
        {group.title}
        <span
          className={clsx(
            'ml-2 transform transition-transform',
            collapsedState[group.title] ? '-rotate-0' : 'rotate-0',
          )}
        >
          {collapsedState[group.title] ? <ChevronRight /> : <ChevronDown />}
        </span>
      </motion.h2>
      {!collapsedState[group.title] && (
        <div className="relative mt-3 pl-2">
          {/* <AnimatePresence initial={!isInsideMobileNavigation}>
            {isActiveGroup && (
              <VisibleSectionHighlight group={group} pathname={pathname} />
            )}
          </AnimatePresence>
          <motion.div
            layout
            className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"
          />
          <AnimatePresence initial={false}>
            {isActiveGroup && (
              <ActivePageMarker group={group} pathname={pathname} />
            )}
          </AnimatePresence> */}
          <ul role="list" className="border-l border-transparent">
            {group.links.map((link) => (
              <motion.li
                key={link.href ?? link.title}
                layout="position"
                className="relative"
              >
                {mapSections(link)}
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </li>
  )
}

export function Navigation(props: React.ComponentPropsWithoutRef<'nav'>) {
  const pathname = usePathname()
  const currentNavigation = pathname.startsWith('/build')
    ? secondaryNavigation
    : mainNavigation

  return (
    <nav {...props}>
      <ul role="list">
        <TopLevelNavItem href="https://whitepaper.arweave.net/" target="_blank" className='flex cursor-pointer justify-between gap-2 py-1 pr-3 text-sm transition text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-emerald-600'>
          White Paper <SquareArrowOutUpRight className="w-4 h-4 transition-colors group-hover:text-zinc-900 dark:group-hover:text-white" />
        </TopLevelNavItem>
        {currentNavigation.map((group, groupIndex) => (
          <NavigationGroup
            key={group.title}
            group={group}
            className={groupIndex === 0 ? 'md:mt-0' : ''}
          />
        ))}
        <li className="sticky bottom-0 z-10 mt-6 min-[416px]:hidden">
          {/* <Button href="#" variant="filled" className="w-full">
            Sign in
          </Button> */}
        </li>
      </ul>
    </nav>
  )
}
