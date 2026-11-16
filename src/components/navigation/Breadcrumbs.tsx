import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronRight, MoreHorizontal, type LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface BreadcrumbItem {
  id: string
  label: string
  icon?: LucideIcon
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  /** Called with the id of a parent segment. The last item is the current folder. */
  onNavigate?: (id: string) => void
  /** Above this many segments, the middle collapses into a menu. Keeps root + the last (n − 1). */
  maxVisible?: number
  className?: string
}

export function Breadcrumbs({ items, onNavigate, maxVisible = 5, className }: BreadcrumbsProps) {
  const collapse = items.length > maxVisible && maxVisible >= 2
  const head = collapse ? items.slice(0, 1) : items
  const hidden = collapse ? items.slice(1, items.length - (maxVisible - 1)) : []
  const tail = collapse ? items.slice(items.length - (maxVisible - 1)) : []
  const visible = collapse ? [...head, null, ...tail] : head

  return (
    <nav aria-label="Breadcrumb" className={cn('min-w-0', className)}>
      <ol className="flex min-w-0 items-center gap-0.5">
        {visible.map((item, i) => {
          const isLast = i === visible.length - 1
          return (
            <li key={item ? (item.id || item.label || `crumb-${i}`) : 'overflow'} className="flex min-w-0 items-center gap-0.5">
              {i > 0 && (
                <ChevronRight aria-hidden size={14} className="shrink-0 text-lv-text-muted/70" />
              )}
              {item === null ? (
                <OverflowMenu items={hidden} onNavigate={onNavigate} />
              ) : isLast ? (
                <span
                  aria-current="page"
                  title={item.label}
                  className="flex min-w-0 items-center gap-1.5 px-1.5 text-small font-semibold text-lv-text"
                >
                  {item.icon && <item.icon size={16} className="shrink-0 text-lv-text-muted" />}
                  <span className="truncate">{item.label}</span>
                </span>
              ) : (
                <button
                  type="button"
                  title={item.label}
                  onClick={() => onNavigate?.(item.id)}
                  className="flex h-7 min-w-0 max-w-[160px] items-center gap-1.5 rounded-lv-sm px-1.5 text-small text-lv-text-muted outline-none transition-[background-color,color] duration-100 ease-out hover:bg-lv-text/[0.05] hover:text-lv-text focus-visible:ring-2 focus-visible:ring-lv-accent/45"
                >
                  {item.icon && <item.icon size={16} className="shrink-0" />}
                  <span className="truncate">{item.label}</span>
                </button>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

function OverflowMenu({
  items,
  onNavigate,
}: {
  items: BreadcrumbItem[]
  onNavigate?: (id: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        aria-label={`Show ${items.length} hidden folders`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex h-7 w-7 items-center justify-center rounded-lv-sm text-lv-text-muted outline-none transition-[background-color,color] duration-100 ease-out hover:bg-lv-text/[0.05] hover:text-lv-text focus-visible:ring-2 focus-visible:ring-lv-accent/45',
          open && 'bg-lv-text/[0.05] text-lv-text'
        )}
      >
        <MoreHorizontal size={16} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, scale: 0.96, y: -2 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -2 }}
            transition={{ duration: reduce ? 0 : 0.15, ease: [0.23, 1, 0.32, 1] }}
            style={{ transformOrigin: 'top left' }}
            className="absolute left-0 top-full z-20 mt-1 flex w-56 flex-col rounded-lv-md border border-lv-border bg-lv-surface p-1 shadow-lv-lg"
          >
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                role="menuitem"
                autoFocus={i === 0}
                onClick={() => {
                  setOpen(false)
                  onNavigate?.(item.id)
                }}
                className="flex h-8 items-center gap-2 rounded-lv-sm px-2 text-left text-small text-lv-text outline-none hover:bg-lv-text/[0.05] focus-visible:bg-lv-accent/[0.12]"
                style={{ paddingLeft: 8 + i * 10 }}
              >
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
