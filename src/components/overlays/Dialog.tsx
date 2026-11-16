import React, { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '../../lib/cn'

export type DialogSize = 'sm' | 'md' | 'lg'

export interface DialogProps {
  open: boolean
  /** Called on Escape, backdrop click, or the close button. */
  onClose: () => void
  title: React.ReactNode
  description?: React.ReactNode
  size?: DialogSize
  /** Shown before the title, e.g. a warning icon. */
  icon?: React.ReactNode
  children?: React.ReactNode
  /** Action buttons, right-aligned. */
  footer?: React.ReactNode
  /** Element to focus on open. Defaults to the first focusable field in the body. */
  initialFocusRef?: React.RefObject<HTMLElement | null>
  showCloseButton?: boolean
  closeOnBackdrop?: boolean
  /** Blocks every way of closing, e.g. while an action is running. */
  dismissible?: boolean
}

/**
 * Accessible modal dialog: focus trap, Escape to close, focus restoration,
 * aria-labelledby / aria-describedby wiring, and a smooth scale-in animation.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  size = 'md',
  icon,
  children,
  footer,
  initialFocusRef,
  showCloseButton = true,
  closeOnBackdrop = true,
  dismissible = true,
}: DialogProps) {
  const titleId = useId()
  const descId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const restoreRef = useRef<HTMLElement | null>(null)
  const reduce = useReducedMotion()

  // Remember the opener, move focus in, and restore focus on close.
  useEffect(() => {
    if (!open) return
    restoreRef.current = document.activeElement as HTMLElement | null
    const frame = requestAnimationFrame(() => {
      const panel = panelRef.current
      if (!panel) return
      const target =
        initialFocusRef?.current ??
        panel.querySelector<HTMLElement>(BODY_FOCUSABLE) ??
        getFocusable(panel)[0] ??
        panel
      target.focus()
    })
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(frame)
      document.body.style.overflow = overflow
      const el = restoreRef.current
      if (el && document.contains(el)) el.focus()
    }
  }, [open, initialFocusRef])

  const requestClose = () => {
    if (dismissible) onClose()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      requestClose()
      return
    }
    if (e.key !== 'Tab' || !panelRef.current) return
    const items = getFocusable(panelRef.current)
    if (items.length === 0) {
      e.preventDefault()
      return
    }
    const first = items[0]
    const last = items[items.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans sm:p-6" onKeyDown={onKeyDown}>
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-lv-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.18, ease: 'easeOut' }}
            onMouseDown={() => closeOnBackdrop && requestClose()}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descId : undefined}
            tabIndex={-1}
            className={cn(
              'relative flex max-h-[calc(100%-16px)] w-full flex-col overflow-hidden rounded-lv-lg border border-lv-border bg-lv-surface text-lv-text shadow-lv-dialog outline-none',
              SIZES[size]
            )}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 4 }}
            transition={{ duration: reduce ? 0.1 : 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="flex items-start gap-3 px-5 pt-5">
              {icon && <div className="mt-0.5 shrink-0">{icon}</div>}
              <div className="min-w-0 flex-1">
                <h2 id={titleId} className="text-h3 font-semibold tracking-tight text-lv-text">
                  {title}
                </h2>
                {description && (
                  <p id={descId} className="mt-1 text-small text-lv-text-muted">
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && (
                <button
                  type="button"
                  aria-label="Close dialog"
                  onClick={requestClose}
                  disabled={!dismissible}
                  className="-mr-1.5 -mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-lv-sm text-lv-text-muted outline-none transition-colors duration-150 hover:bg-lv-bg hover:text-lv-text focus-visible:ring-2 focus-visible:ring-lv-accent/60 disabled:opacity-40"
                >
                  <X size={16} aria-hidden />
                </button>
              )}
            </div>

            {children && (
              <div data-dialog-body className="min-h-0 overflow-y-auto px-5 pt-4">
                {children}
              </div>
            )}

            {footer ? (
              <div className="mt-5 flex flex-col-reverse gap-2 border-t border-lv-border bg-lv-bg/60 px-5 py-3 sm:flex-row sm:justify-end">
                {footer}
              </div>
            ) : (
              <div className="h-5" />
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}

const SIZES: Record<DialogSize, string> = {
  sm: 'max-w-[400px]',
  md: 'max-w-[520px]',
  lg: 'max-w-[680px]',
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

const BODY_FOCUSABLE = FOCUSABLE.split(', ')
  .map((s) => `[data-dialog-body] ${s}`)
  .join(', ')

function getFocusable(root: HTMLElement) {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null || el === document.activeElement)
}
