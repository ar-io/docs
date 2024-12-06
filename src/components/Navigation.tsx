'use client'

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

function useInitialValue<T>(value: T, condition = true) {
  let initialValue = useRef(value).current
  return condition ? initialValue : value
}

export interface NavGroup {
  title: string;
  links: Array<{
    title: string;
    href?: string;
    children?: Array<{
      title: string;
      href?: string;
      children?: Array<{
        title: string;
        href?: string; // Made href optional
      }>;
    }>;
  }>;
}

function TopLevelNavItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <li className="md:hidden">
      <Link
        href={href}
        className="block py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
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
  if (!href) return null // Only render if href is defined

  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'flex justify-between gap-2 py-1 pr-3 text-sm transition',
        isAnchorLink ? 'pl-7' : 'pl-4',
        active
          ? 'text-zinc-900 dark:text-white'
          : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white',
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

function isLinkActive(
  link: { href?: string; children?: { href?: string; children?: any[] }[] },
  pathname: string
): boolean {
  return (
    link.href === pathname ||
    (link.children?.some((child) => isLinkActive(child, pathname)) ?? false)
  );
}

function VisibleSectionHighlight({
  group,
  pathname,
}: {
  group: NavGroup
  pathname: string
}) {
  const [highlightTop, setHighlightTop] = useState(0)
  const [highlightHeight, setHighlightHeight] = useState(remToPx(2))
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

  useEffect(() => {
    const updateHighlightPosition = () => {
      const activeLink = findActiveLink(group.links, pathname)
      if (activeLink) {
        const linkElement = document.querySelector(`[href='${activeLink.link.href}']`)
        if (linkElement) {
          const offsetTop = linkElement.getBoundingClientRect().top + window.scrollY
          const parentOffsetTop = linkElement.closest('.relative')?.getBoundingClientRect().top ?? 0
          setHighlightTop(offsetTop - parentOffsetTop)
        } else {
          const linkIndex = activeLink.index
          setHighlightTop(linkIndex * itemHeight + firstVisibleSectionIndex * itemHeight)
        }
        setHighlightHeight(height)
      }
    }

    updateHighlightPosition()
    window.addEventListener('scroll', updateHighlightPosition)
    window.addEventListener('resize', updateHighlightPosition)
    return () => {
      window.removeEventListener('scroll', updateHighlightPosition)
      window.removeEventListener('resize', updateHighlightPosition)
    }
  }, [pathname, sections, visibleSections])

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

function findActiveLink(links: Array<{ href?: string; children?: any[] }>, pathname: string): { link: { href?: string; children?: any[] }; index: number } | null {
  let activeLink: { link: { href?: string; children?: any[] }; index: number } | null = null
  links.forEach((link, index) => {
    if (isLinkActive(link, pathname)) {
      activeLink = { link, index }
    }
  })
  return activeLink
}

function ActivePageMarker({
  group,
  pathname,
}: {
  group: NavGroup
  pathname: string
}) {
  let itemHeight = remToPx(2)
  let offset = remToPx(0.25)

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

  let isActiveGroup =
    group.links.some((link) => isLinkActive(link, pathname))

  return (
    <li className={clsx('relative mt-6', className)}>
      <motion.h2
        layout="position"
        className="text-xs font-semibold text-zinc-900 dark:text-white"
      >
        {group.title}
      </motion.h2>
      <div className="relative mt-3 pl-2">
        <AnimatePresence initial={!isInsideMobileNavigation}>
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
        </AnimatePresence>
        <ul role="list" className="border-l border-transparent">
          {group.links.map((link) => (
            <motion.li key={link.href ?? link.title} layout="position" className="relative">
              {link.href ? (
                <NavLink href={link.href} active={isLinkActive(link, pathname)}>
                  {link.title}
                </NavLink>
              ) : (
                <span className="pl-4 text-sm text-zinc-900 dark:text-white">
                  {link.title}
                </span>
              )}
              {isLinkActive(link, pathname) && sections.length > 0 && link.href === pathname && (
                <motion.ul
                  role="list"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { delay: 0.1 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15 },
                  }}
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
              {link.children && (
                <ul role="list" className="pl-4">
                  {link.children.map((child) => (
                    <li key={child.href ?? child.title} className="mt-2">
                      {child.href ? (
                        <NavLink href={child.href} active={isLinkActive(child, pathname)}>
                          {child.title}
                        </NavLink>
                      ) : (
                        <span className="pl-4 text-sm text-zinc-900 dark:text-white">
                          {child.title}
                        </span>
                      )}
                      {isLinkActive(child, pathname) && sections.length > 0 && child.href === pathname && (
                        <motion.ul
                          role="list"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: 1,
                            transition: { delay: 0.1 },
                          }}
                          exit={{
                            opacity: 0,
                            transition: { duration: 0.15 },
                          }}
                        >
                          {sections.map((section) => (
                            <li key={section.id}>
                              <NavLink
                                href={`${child.href}#${section.id}`}
                                tag={section.tag}
                                isAnchorLink
                              >
                                {section.title}
                              </NavLink>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                      {child.children && (
                        <ul role="list" className="pl-4">
                          {child.children.map((subChild) => (
                            <li key={subChild.href ?? subChild.title} className="mt-2">
                              {subChild.href ? (
                                <NavLink href={subChild.href} active={isLinkActive(subChild, pathname)}>
                                  {subChild.title}
                                </NavLink>
                              ) : (
                                <span className="pl-4 text-sm text-zinc-900 dark:text-white">
                                  {subChild.title}
                                </span>
                              )}
                              {isLinkActive(subChild, pathname) && sections.length > 0 && subChild.href === pathname && (
                                <motion.ul
                                  role="list"
                                  initial={{ opacity: 0 }}
                                  animate={{
                                    opacity: 1,
                                    transition: { delay: 0.1 },
                                  }}
                                  exit={{
                                    opacity: 0,
                                    transition: { duration: 0.15 },
                                  }}
                                >
                                  {sections.map((section) => (
                                    <li key={section.id}>
                                      <NavLink
                                        href={`${subChild.href}#${section.id}`}
                                        tag={section.tag}
                                        isAnchorLink
                                      >
                                        {section.title}
                                      </NavLink>
                                    </li>
                                  ))}
                                </motion.ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export function Navigation(props: React.ComponentPropsWithoutRef<'nav'>) {
  const pathname = usePathname()
  const currentNavigation = pathname.startsWith('/build') ? secondaryNavigation : mainNavigation

  return (
    <nav {...props}>
      <ul role="list">
        <TopLevelNavItem href="/">API</TopLevelNavItem>
        <TopLevelNavItem href="#">Documentation</TopLevelNavItem>
        <TopLevelNavItem href="#">Support</TopLevelNavItem>
        {currentNavigation.map((group, groupIndex) => (
          <NavigationGroup
            key={group.title}
            group={group}
            className={groupIndex === 0 ? 'md:mt-0' : ''}
          />
        ))}
        <li className="sticky bottom-0 z-10 mt-6 min-[416px]:hidden">
          <Button href="#" variant="filled" className="w-full">
            Sign in
          </Button>
        </li>
      </ul>
    </nav>
  )
}
