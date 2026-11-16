import React from 'react'
import { cn } from '../../lib/cn'
import { BODY_PADDING, type CardPadding } from './Card'

export interface InteractiveCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect' | 'title'> {
  selected?: boolean
  disabled?: boolean
  padding?: CardPadding
  /** Fired on click, Enter or Space. */
  onSelect?: (event: React.MouseEvent | React.KeyboardEvent) => void
  /** Fired on double-click — e.g. open a folder. */
  onOpen?: () => void
  /** ARIA role. "button" by default; use "radio" or "option" inside a group. */
  role?: 'button' | 'radio' | 'option' | 'checkbox'
}

/**
 * A focusable, selectable surface. Renders a div with a button-like role so it can
 * hold block content; keyboard behaviour matches a native button.
 */
export function InteractiveCard({
  selected = false,
  disabled = false,
  padding = 'standard',
  onSelect,
  onOpen,
  role = 'button',
  className,
  children,
  ...rest
}: InteractiveCardProps) {
  const selectionAttr =
    role === 'button'
      ? { 'aria-pressed': selected }
      : role === 'option'
        ? { 'aria-selected': selected }
        : { 'aria-checked': selected }

  return (
    <div
      role={role}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      {...selectionAttr}
      onClick={(e) => !disabled && onSelect?.(e)}
      onDoubleClick={() => !disabled && onOpen?.()}
      onKeyDown={(e) => {
        if (disabled) return
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault()
          if (e.key === 'Enter' && onOpen && selected) onOpen()
          else onSelect?.(e)
        }
      }}
      className={cn(
        'relative min-w-0 select-none rounded-lv-lg border bg-lv-surface text-left text-lv-text outline-none',
        'transition-[background-color,border-color,box-shadow] duration-150 ease-out',
        'focus-visible:ring-2 focus-visible:ring-lv-accent/45 focus-visible:ring-offset-2 focus-visible:ring-offset-lv-bg',
        disabled
          ? 'cursor-not-allowed border-lv-border opacity-50'
          : selected
            ? 'cursor-default border-lv-accent bg-lv-accent/[0.06] shadow-[0_0_0_1px_var(--lv-accent)]'
            : 'cursor-default border-lv-border hover:border-lv-text-muted/40 hover:shadow-lv-sm',
        BODY_PADDING[padding],
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
