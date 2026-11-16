import React, { useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface NavigationGroupProps {
  label: string
  /** Lets the user fold the group away. */
  collapsible?: boolean
  /** Uncontrolled initial state. */
  defaultOpen?: boolean
  /** Controlled open state. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Icon-only sidebar: the label becomes a hairline divider. */
  compact?: boolean
  children: React.ReactNode
}

export function NavigationGroup({
  label,
  collapsible = false,
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  compact = false,
  children,
}: NavigationGroupProps) {
  const [openState, setOpenState] = useState(defaultOpen)
  const open = openProp ?? openState
  const reduce = useReducedMotion()
  const contentId = useId()

  const toggle = () => {
    const next = !open
    setOpenState(next)
    onOpenChange?.(next)
  }

  const isOpen = compact || !collapsible || open

  return (
    <div role="group" aria-label={label} className="group/navgroup flex flex-col">
      {compact ? (
        <div aria-hidden className="mx-2 mb-1.5 h-px bg-lv-border group-first/navgroup:hidden" />
      ) : collapsible ? (
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls={contentId}
          className="group flex h-7 items-center gap-1 rounded-lv-sm px-2 text-caption font-semibold text-lv-text-muted outline-none transition-colors duration-100 ease-out hover:text-lv-text focus-visible:ring-2 focus-visible:ring-lv-accent/45"
        >
          <span className="truncate">{label}</span>
          <ChevronRight
            size={14}
            className={cn(
              'shrink-0 opacity-70 transition-transform duration-150 ease-out',
              open && 'rotate-90'
            )}
          />
        </button>
      ) : (
        <p className="flex h-7 items-center px-2 text-caption font-semibold text-lv-text-muted">{label}</p>
      )}

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className={cn('flex flex-col gap-0.5', compact && 'items-center')}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
