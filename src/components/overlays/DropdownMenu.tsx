import React, { useCallback, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '../../lib/cn'
import { useDismiss, overlayEase } from '../../hooks/useDismiss'
import { type Placement, useFloatingPosition } from '../../hooks/useFloatingPosition'

export interface DropdownMenuItem {
  type?: 'item'
  id: string
  label: string
  /** A 16px Lucide icon, e.g. `<Download size={16} />`. */
  icon?: React.ReactNode
  shortcut?: string
  /** Short trailing text, e.g. why an item is disabled. */
  hint?: string
  disabled?: boolean
  destructive?: boolean
  /** Set to true/false to render the item as a radio choice with a checkmark. */
  checked?: boolean
}

export type DropdownMenuEntry =
  | DropdownMenuItem
  | { type: 'divider'; id: string }
  | { type: 'label'; id: string; label: string }

export interface DropdownMenuProps {
  /** Content of the trigger button: text, an icon, or both. */
  trigger: React.ReactNode
  /** Required when the trigger has no visible text. */
  triggerAriaLabel?: string
  /** `button` draws a labelled button with a chevron; `icon` a square icon button. */
  triggerVariant?: 'button' | 'icon'
  items: DropdownMenuEntry[]
  onSelect?: (id: string) => void
  placement?: Placement
  /** Minimum menu width in px. */
  minWidth?: number
  className?: string
}

export function DropdownMenu({
  trigger,
  triggerAriaLabel,
  triggerVariant = 'button',
  items,
  onSelect,
  placement = 'bottom-start',
  minWidth = 200,
  className = '',
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false)
  const [initialFocus, setInitialFocus] = useState<'first' | 'last' | 'menu'>('menu')
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const typeahead = useRef({ text: '', timer: 0 })
  const menuId = useId()
  const reduceMotion = useReducedMotion()

  const position = useFloatingPosition(open, triggerRef, menuRef, { placement, offset: 6 })

  const close = useCallback((returnFocus = true) => {
    setOpen(false)
    if (returnFocus) triggerRef.current?.focus()
  }, [])

  useDismiss(open, [triggerRef, menuRef], (reason) => close(reason === 'escape'))

  const enabledIndexes = items
    .map((item, i) => (isItem(item) && !item.disabled ? i : -1))
    .filter((i) => i >= 0)

  const focusIndex = (index: number) => itemRefs.current[index]?.focus()

  useEffect(() => {
    if (!open || !position) return
    if (initialFocus === 'first') focusIndex(enabledIndexes[0])
    else if (initialFocus === 'last') focusIndex(enabledIndexes[enabledIndexes.length - 1])
    else menuRef.current?.focus()
  }, [open, position !== null])

  const openWith = (focus: 'first' | 'last' | 'menu') => {
    setInitialFocus(focus)
    setOpen(true)
  }

  const onTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (['ArrowDown', 'Enter', ' '].includes(event.key)) {
      event.preventDefault()
      openWith('first')
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      openWith('last')
    }
  }

  const onMenuKeyDown = (event: React.KeyboardEvent) => {
    const current = itemRefs.current.findIndex((el) => el === document.activeElement)
    const pos = enabledIndexes.indexOf(current)
    const move = (to: number) => {
      event.preventDefault()
      focusIndex(enabledIndexes[(to + enabledIndexes.length) % enabledIndexes.length])
    }
    switch (event.key) {
      case 'ArrowDown':
        return move(pos < 0 ? 0 : pos + 1)
      case 'ArrowUp':
        return move(pos < 0 ? enabledIndexes.length - 1 : pos - 1)
      case 'Home':
        return move(0)
      case 'End':
        return move(enabledIndexes.length - 1)
      case 'Tab':
        event.preventDefault()
        return close()
      default:
        if (event.key.length === 1 && /\S/.test(event.key)) {
          window.clearTimeout(typeahead.current.timer)
          typeahead.current.text += event.key.toLowerCase()
          typeahead.current.timer = window.setTimeout(() => (typeahead.current.text = ''), 500)
          const match = enabledIndexes.find((i) => {
            const item = items[i]
            return isItem(item) && item.label.toLowerCase().startsWith(typeahead.current.text)
          })
          if (match !== undefined) focusIndex(match)
        }
    }
  }

  const select = (item: DropdownMenuItem) => {
    if (item.disabled) return
    onSelect?.(item.id)
    close()
  }

  const triggerClass =
    triggerVariant === 'icon'
      ? 'h-8 w-8 justify-center'
      : 'h-8 gap-1.5 px-2.5 text-small font-medium'

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={triggerAriaLabel}
        onClick={() => (open ? close(false) : openWith('menu'))}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          'inline-flex items-center whitespace-nowrap rounded-lv-sm border border-lv-border bg-lv-surface text-lv-text shadow-lv-sm transition-colors duration-150 ease-out hover:bg-lv-hover active:bg-lv-press aria-expanded:bg-lv-press',
          triggerClass,
          className
        )}
      >
        {trigger}
        {triggerVariant === 'button' && (
          <ChevronDown
            size={14}
            aria-hidden
            className={cn('text-lv-text-muted transition-transform duration-150 ease-out', open && 'rotate-180')}
          />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id={menuId}
            role="menu"
            tabIndex={-1}
            aria-orientation="vertical"
            onKeyDown={onMenuKeyDown}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: position?.side === 'top' ? 4 : -4 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.16, ease: overlayEase } }}
            exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.98, transition: { duration: 0.12, ease: overlayEase } }}
            style={{
              position: 'fixed',
              left: position?.x ?? 0,
              top: position?.y ?? 0,
              minWidth,
              visibility: position ? 'visible' : 'hidden',
              transformOrigin: position?.origin,
            }}
            className="z-50 rounded-lv-md border border-lv-border bg-lv-elevated p-1 text-small text-lv-text shadow-lv-menu outline-none"
          >
            {items.map((entry, index) => {
              if (entry.type === 'divider') {
                return <div key={entry.id} role="separator" className="-mx-1 my-1 h-px bg-lv-border" />
              }
              if (entry.type === 'label') {
                return (
                  <div key={entry.id} role="presentation" className="px-2 pb-1 pt-1.5 text-caption font-medium text-lv-text-muted">
                    {entry.label}
                  </div>
                )
              }
              const item = entry
              const selectable = item.checked !== undefined
              return (
                <button
                  key={item.id}
                  ref={(el) => (itemRefs.current[index] = el)}
                  type="button"
                  role={selectable ? 'menuitemradio' : 'menuitem'}
                  aria-checked={selectable ? item.checked : undefined}
                  aria-disabled={item.disabled || undefined}
                  tabIndex={-1}
                  onClick={() => select(item)}
                  onPointerMove={(e) => !item.disabled && e.currentTarget.focus()}
                  onPointerLeave={() => menuRef.current?.focus()}
                  className={cn(
                    'flex h-8 w-full items-center gap-2 rounded-lv-sm px-2 text-left outline-none',
                    item.disabled
                      ? 'cursor-not-allowed text-lv-text-muted opacity-60'
                      : item.destructive
                        ? 'text-lv-danger focus:bg-lv-danger/10'
                        : 'text-lv-text focus:bg-lv-hover'
                  )}
                >
                  {item.icon && (
                    <span aria-hidden className={cn('flex shrink-0', item.destructive ? '' : 'text-lv-text-muted')}>
                      {item.icon}
                    </span>
                  )}
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {item.hint && <span className="shrink-0 text-caption text-lv-text-muted">{item.hint}</span>}
                  {item.shortcut && (
                    <kbd className="shrink-0 font-sans text-caption text-lv-text-muted">{item.shortcut}</kbd>
                  )}
                  {selectable && (
                    <Check size={14} aria-hidden className={cn('shrink-0 text-lv-accent', item.checked ? '' : 'invisible')} />
                  )}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function isItem(entry: DropdownMenuEntry): entry is DropdownMenuItem {
  return entry.type === undefined || entry.type === 'item'
}
