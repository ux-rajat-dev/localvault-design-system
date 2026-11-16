import React, { useRef } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface TabItem {
  id: string
  label: string
  icon?: LucideIcon
  count?: number
  disabled?: boolean
}

export interface TabsProps {
  items: TabItem[]
  value: string
  onChange: (id: string) => void
  /** underline: switches content areas · segmented: switches modes of one view */
  variant?: 'underline' | 'segmented'
  /** Segmented only: hide labels, keep them as aria-label and tooltip. */
  iconOnly?: boolean
  ariaLabel: string
  className?: string
}

/**
 * Accessible tablist. ←/→ move and activate, Home/End jump, disabled tabs are skipped.
 */
export function Tabs({
  items,
  value,
  onChange,
  variant = 'underline',
  iconOnly = false,
  ariaLabel,
  className,
}: TabsProps) {
  const refs = useRef<Array<HTMLButtonElement | null>>([])
  const segmented = variant === 'segmented'

  const onKeyDown = (e: React.KeyboardEvent) => {
    const enabled = items.map((t, i) => (t.disabled ? -1 : i)).filter((i) => i >= 0)
    const current = enabled.indexOf(items.findIndex((t) => t.id === value))
    let next: number | undefined
    if (e.key === 'ArrowRight') next = enabled[(current + 1) % enabled.length]
    else if (e.key === 'ArrowLeft') next = enabled[(current - 1 + enabled.length) % enabled.length]
    else if (e.key === 'Home') next = enabled[0]
    else if (e.key === 'End') next = enabled[enabled.length - 1]
    if (next === undefined) return
    e.preventDefault()
    onChange(items[next].id)
    refs.current[next]?.focus()
  }

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      className={cn(
        segmented
          ? 'inline-flex shrink-0 gap-0.5 rounded-lv-md bg-lv-text/[0.06] p-0.5'
          : 'flex gap-5 overflow-x-auto border-b border-lv-border',
        className
      )}
    >
      {items.map((tab, i) => {
        const active = tab.id === value
        const Icon = tab.icon
        return (
          <button
            key={tab.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="tab"
            aria-selected={active}
            aria-disabled={tab.disabled || undefined}
            disabled={tab.disabled}
            tabIndex={active ? 0 : -1}
            aria-label={iconOnly ? tab.label : undefined}
            title={iconOnly ? tab.label : undefined}
            onClick={() => onChange(tab.id)}
            className={cn(
              'inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap text-small font-medium outline-none',
              'focus-visible:ring-2 focus-visible:ring-lv-accent/45',
              segmented
                ? cn(
                    'h-7 rounded-[8px] transition-[background-color,color,box-shadow] duration-150 ease-out',
                    iconOnly ? 'w-8' : 'px-3',
                    active
                      ? 'bg-lv-surface text-lv-text shadow-lv-sm'
                      : 'text-lv-text-muted enabled:hover:text-lv-text'
                  )
                : cn(
                    '-mb-px h-9 border-b-2 transition-[border-color,color] duration-150 ease-out focus-visible:ring-inset',
                    active
                      ? 'border-lv-accent text-lv-text'
                      : 'border-transparent text-lv-text-muted enabled:hover:border-lv-border enabled:hover:text-lv-text'
                  ),
              tab.disabled && 'cursor-not-allowed opacity-40'
            )}
          >
            {Icon && <Icon size={16} strokeWidth={1.75} />}
            {!iconOnly && tab.label}
            {!iconOnly && tab.count != null && (
              <span
                className={cn(
                  'rounded-lv-full px-1.5 text-caption tabular-nums',
                  active ? 'bg-lv-accent/[0.12] text-lv-accent' : 'bg-lv-text/[0.06] text-lv-text-muted'
                )}
              >
                {tab.count.toLocaleString('en-US')}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
