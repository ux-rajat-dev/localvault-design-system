import React, { cloneElement, isValidElement, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { overlayEase } from '../../hooks/useDismiss'
import { type Placement, useFloatingPosition } from '../../hooks/useFloatingPosition'

export interface TooltipProps {
  /** Short text, a few words. Read to assistive tech via aria-describedby. */
  content: string
  /** Optional keyboard shortcut shown after the text, e.g. "⌘D". */
  shortcut?: string
  placement?: Placement
  /** Hover delay before showing, in ms. Keyboard focus shows immediately. */
  delay?: number
  /** A single focusable element, usually an icon button. */
  children: React.ReactElement
}

// Once one tooltip has shown, neighbours open instantly for a moment — like native toolbars.
let warmUntil = 0

export function Tooltip({ content, shortcut, placement = 'top', delay = 450, children }: TooltipProps) {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLSpanElement>(null)
  const tipRef = useRef<HTMLDivElement>(null)
  const timer = useRef<number | undefined>(undefined)
  const id = useId()
  const reduceMotion = useReducedMotion()
  const position = useFloatingPosition(open, anchorRef, tipRef, { placement, offset: 6 })

  const show = (immediate: boolean) => {
    window.clearTimeout(timer.current)
    if (immediate || Date.now() < warmUntil) setOpen(true)
    else timer.current = window.setTimeout(() => setOpen(true), delay)
  }
  const hide = () => {
    window.clearTimeout(timer.current)
    if (open) warmUntil = Date.now() + 400
    setOpen(false)
  }

  useEffect(() => () => window.clearTimeout(timer.current), [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  const child = isValidElement(children)
    ? cloneElement(children as React.ReactElement<Record<string, unknown>>, { 'aria-describedby': open ? id : undefined })
    : children

  const offset = 4
  const from =
    position?.side === 'bottom' ? { y: -offset } : position?.side === 'left' ? { x: offset } : position?.side === 'right' ? { x: -offset } : { y: offset }

  return (
    <>
      <span
        ref={anchorRef}
        className="inline-flex"
        onPointerEnter={(e) => e.pointerType === 'mouse' && show(false)}
        onPointerLeave={hide}
        onPointerDown={hide}
        onFocus={(e) => {
          const target = e.target as HTMLElement
          if (target.matches(':focus-visible')) show(true)
        }}
        onBlur={hide}
      >
        {child}
      </span>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={tipRef}
            id={id}
            role="tooltip"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, ...from }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0, transition: { duration: 0.14, ease: overlayEase } }}
            exit={{ opacity: 0, transition: { duration: 0.1, ease: overlayEase } }}
            style={{
              position: 'fixed',
              left: position?.x ?? 0,
              top: position?.y ?? 0,
              visibility: position ? 'visible' : 'hidden',
              transformOrigin: position?.origin,
            }}
            className="pointer-events-none z-[60] flex max-w-[240px] items-center gap-2 whitespace-nowrap rounded-lv-sm bg-lv-inverse px-2 py-1 text-caption font-medium text-lv-inverse-text shadow-lv-md"
          >
            {content}
            {shortcut && <kbd className="font-sans text-caption opacity-60">{shortcut}</kbd>}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
