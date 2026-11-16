import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/cn'

export type ContextMenuEntry =
  | {
      type?: 'item'
      id: string
      label: string
      icon?: React.ReactNode
      shortcut?: string
      disabled?: boolean
      destructive?: boolean
    }
  | { type: 'separator'; id: string }

export interface ContextMenuProps {
  items: ContextMenuEntry[]
  onSelect: (id: string) => void
  /** Accessible name for the menu, e.g. "Actions for Q3-Report.pdf". */
  label: string
  /** The target. Right-click it, or focus inside it and press Shift+F10 / Menu. */
  children: React.ReactNode
  onOpenChange?: (open: boolean) => void
  className?: string
}

type Point = { x: number; y: number }
const EDGE = 8

/** Right-click / keyboard context menu with roving focus and viewport-aware placement. */
export function ContextMenu({ items, onSelect, label, children, onOpenChange, className }: ContextMenuProps) {
  const [anchor, setAnchor] = useState<Point | null>(null)
  const [pos, setPos] = useState<Point | null>(null)
  const [active, setActive] = useState(-1)
  const menuRef = useRef<HTMLDivElement>(null)
  const restoreRef = useRef<HTMLElement | null>(null)
  const typeahead = useRef({ text: '', at: 0 })
  const menuId = useId()
  const reduce = useReducedMotion()
  const open = anchor !== null

  const enabled = items
    .map((it, i) => ({ it, i }))
    .filter(({ it }) => it.type !== 'separator' && !('disabled' in it && it.disabled))
    .map(({ i }) => i)

  const openAt = (point: Point, fromKeyboard: boolean) => {
    restoreRef.current = document.activeElement as HTMLElement | null
    setAnchor(point)
    setPos(null)
    setActive(fromKeyboard ? enabled[0] ?? -1 : -1)
    onOpenChange?.(true)
  }

  const close = useCallback(
    (restore = true) => {
      setAnchor(null)
      setActive(-1)
      onOpenChange?.(false)
      const el = restoreRef.current
      if (restore && el && document.contains(el)) el.focus()
    },
    [onOpenChange]
  )

  // Measure, then flip / clamp so the menu never leaves the viewport.
  useLayoutEffect(() => {
    if (!anchor || !menuRef.current) return
    const { offsetWidth: w, offsetHeight: h } = menuRef.current
    const vw = window.innerWidth
    const vh = window.innerHeight
    let x = anchor.x
    let y = anchor.y
    if (x + w > vw - EDGE) x = Math.max(EDGE, anchor.x - w)
    if (y + h > vh - EDGE) y = Math.max(EDGE, anchor.y - h)
    setPos({ x: Math.min(x, vw - w - EDGE), y: Math.min(y, vh - h - EDGE) })
  }, [anchor])

  useEffect(() => {
    if (open) menuRef.current?.focus()
  }, [open])

  // Outside press, scroll, resize and blur all dismiss.
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) close(false)
    }
    const dismiss = () => close(false)
    document.addEventListener('mousedown', onDown)
    window.addEventListener('resize', dismiss)
    window.addEventListener('scroll', dismiss, true)
    window.addEventListener('blur', dismiss)
    return () => {
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('resize', dismiss)
      window.removeEventListener('scroll', dismiss, true)
      window.removeEventListener('blur', dismiss)
    }
  }, [open, close])

  const onTargetContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    openAt({ x: e.clientX, y: e.clientY }, false)
  }

  const onTargetKeyDown = (e: React.KeyboardEvent) => {
    if ((e.shiftKey && e.key === 'F10') || e.key === 'ContextMenu') {
      e.preventDefault()
      const r = (e.target as HTMLElement).getBoundingClientRect()
      openAt({ x: r.left + 12, y: r.bottom + 4 }, true)
    }
  }

  const select = (index: number) => {
    const it = items[index]
    if (!it || it.type === 'separator' || it.disabled) return
    close(true)
    onSelect(it.id)
  }

  const move = (dir: 1 | -1) => {
    if (enabled.length === 0) return
    const at = enabled.indexOf(active)
    const next = at === -1 ? (dir === 1 ? 0 : enabled.length - 1) : (at + dir + enabled.length) % enabled.length
    setActive(enabled[next])
  }

  const onMenuKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        move(1)
        return
      case 'ArrowUp':
        e.preventDefault()
        move(-1)
        return
      case 'Home':
        e.preventDefault()
        setActive(enabled[0] ?? -1)
        return
      case 'End':
        e.preventDefault()
        setActive(enabled[enabled.length - 1] ?? -1)
        return
      case 'Enter':
      case ' ':
        e.preventDefault()
        select(active)
        return
      case 'Escape':
        e.preventDefault()
        e.stopPropagation()
        close(true)
        return
      case 'Tab':
        e.preventDefault()
        close(true)
        return
    }
    // Typeahead: jump to the next enabled item starting with the typed letters.
    if (e.key.length === 1 && /\S/.test(e.key)) {
      const now = Date.now()
      const t = typeahead.current
      t.text = now - t.at < 600 ? t.text + e.key.toLowerCase() : e.key.toLowerCase()
      t.at = now
      const match = enabled.find((i) => {
        const it = items[i]
        return it.type !== 'separator' && it.label.toLowerCase().startsWith(t.text)
      })
      if (match !== undefined) setActive(match)
    }
  }

  return (
    <>
      <div
        className={className}
        onContextMenu={onTargetContextMenu}
        onKeyDown={onTargetKeyDown}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
      >
        {children}
      </div>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                ref={menuRef}
                id={menuId}
                role="menu"
                aria-label={label}
                aria-activedescendant={active >= 0 ? `${menuId}-${active}` : undefined}
                tabIndex={-1}
                onKeyDown={onMenuKeyDown}
                onContextMenu={(e) => e.preventDefault()}
                style={{
                  left: pos?.x ?? anchor!.x,
                  top: pos?.y ?? anchor!.y,
                  visibility: pos ? 'visible' : 'hidden',
                  transformOrigin: 'top left',
                }}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.08 } }}
                transition={{ duration: reduce ? 0 : 0.14, ease: [0.23, 1, 0.32, 1] }}
                className="fixed z-50 min-w-[220px] rounded-lv-md border border-lv-border bg-lv-surface p-1 font-sans text-lv-text shadow-lv-menu outline-none"
              >
                {items.map((it, i) =>
                  it.type === 'separator' ? (
                    <div key={it.id} role="separator" className="mx-2 my-1 h-px bg-lv-border" />
                  ) : (
                    <div
                      key={it.id}
                      id={`${menuId}-${i}`}
                      role="menuitem"
                      aria-disabled={it.disabled || undefined}
                      onMouseMove={() => !it.disabled && active !== i && setActive(i)}
                      onMouseLeave={() => setActive(-1)}
                      onClick={() => select(i)}
                      className={cn(
                        'flex h-8 cursor-default select-none items-center gap-2.5 rounded-lv-sm px-2 text-small outline-none',
                        it.disabled
                          ? 'text-lv-text-muted opacity-50'
                          : active === i
                            ? it.destructive
                              ? 'bg-lv-danger text-white'
                              : 'bg-lv-accent text-lv-on-accent'
                            : it.destructive
                              ? 'text-lv-danger'
                              : 'text-lv-text hover:bg-lv-hover'
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          'flex w-4 shrink-0 justify-center',
                          active === i || it.disabled || it.destructive ? '' : 'text-lv-text-muted'
                        )}
                      >
                        {it.icon}
                      </span>
                      <span className="flex-1 whitespace-nowrap">{it.label}</span>
                      {it.shortcut && (
                        <span
                          aria-hidden
                          className={cn(
                            'ml-6 text-caption tracking-wide',
                            active === i ? 'opacity-80' : 'text-lv-text-muted'
                          )}
                        >
                          {it.shortcut}
                        </span>
                      )}
                    </div>
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  )
}
