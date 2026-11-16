import React, { cloneElement, isValidElement, useCallback, useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { useDismiss, overlayEase } from '../../hooks/useDismiss'
import { type Placement, useFloatingPosition } from '../../hooks/useFloatingPosition'

export interface PopoverProps {
  /** A single button element; it receives the open/close wiring and ARIA attributes. */
  trigger: React.ReactElement
  /** Heading of the panel, also its accessible name. */
  title: string
  /** Panel content, or a function receiving `close` for in-panel actions. */
  children: React.ReactNode | ((api: { close: () => void }) => React.ReactNode)
  placement?: Placement
  /** Panel width in px. */
  width?: number
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'

export function Popover({
  trigger,
  title,
  children,
  placement = 'bottom-start',
  width = 288,
  open: controlledOpen,
  onOpenChange,
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const open = controlledOpen ?? uncontrolledOpen
  const anchorRef = useRef<HTMLSpanElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const panelId = useId()
  const titleId = useId()
  const reduceMotion = useReducedMotion()
  const position = useFloatingPosition(open, anchorRef, panelRef, { placement, offset: 8 })

  const setOpen = useCallback(
    (next: boolean) => {
      setUncontrolledOpen(next)
      onOpenChange?.(next)
    },
    [onOpenChange]
  )

  const focusTrigger = () => anchorRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus()

  const close = useCallback(
    (returnFocus = true) => {
      setOpen(false)
      if (returnFocus) focusTrigger()
    },
    [setOpen]
  )

  // Escape returns focus to the trigger; an outside click leaves focus where the user clicked.
  useDismiss(open, [anchorRef, panelRef], (reason) => close(reason === 'escape'))

  // Move focus into the panel once it is positioned.
  useEffect(() => {
    if (!open || !position) return
    const panel = panelRef.current
    if (!panel) return
    const preferred = panel.querySelector<HTMLElement>('[data-autofocus]')
    const first = panel.querySelector<HTMLElement>(FOCUSABLE)
    ;(preferred ?? first ?? panel).focus()
  }, [open, position !== null])

  const onPanelBlur = (event: React.FocusEvent) => {
    const next = event.relatedTarget as Node | null
    if (next && !panelRef.current?.contains(next) && !anchorRef.current?.contains(next)) close(false)
  }

  const triggerEl = isValidElement(trigger)
    ? cloneElement(trigger as React.ReactElement<Record<string, unknown>>, {
        'aria-haspopup': 'dialog',
        'aria-expanded': open,
        'aria-controls': open ? panelId : undefined,
        onClick: () => setOpen(!open),
      })
    : trigger

  return (
    <>
      <span ref={anchorRef} className="inline-flex">
        {triggerEl}
      </span>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal={false}
            aria-labelledby={titleId}
            tabIndex={-1}
            onBlur={onPanelBlur}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: position?.side === 'top' ? 4 : -4 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.18, ease: overlayEase } }}
            exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.98, transition: { duration: 0.12, ease: overlayEase } }}
            style={{
              position: 'fixed',
              left: position?.x ?? 0,
              top: position?.y ?? 0,
              width,
              maxWidth: 'calc(100vw - 16px)',
              visibility: position ? 'visible' : 'hidden',
              transformOrigin: position?.origin,
            }}
            className="z-50 rounded-lv-lg border border-lv-border bg-lv-elevated text-small text-lv-text shadow-lv-menu outline-none"
          >
            <div className="flex items-center justify-between gap-2 py-2 pl-3.5 pr-2">
              <h3 id={titleId} className="text-small font-semibold">
                {title}
              </h3>
              <button
                type="button"
                aria-label="Close"
                onClick={() => close()}
                className="flex h-6 w-6 items-center justify-center rounded-lv-sm text-lv-text-muted transition-colors duration-150 ease-out hover:bg-lv-hover hover:text-lv-text"
              >
                <X size={14} aria-hidden />
              </button>
            </div>
            <div className="border-t border-lv-border">
              {typeof children === 'function' ? children({ close: () => close() }) : children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
