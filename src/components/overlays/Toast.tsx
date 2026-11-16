import React, { useEffect, useRef } from 'react'
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react'
import { cn } from '../../lib/cn'

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

export interface ToastProps {
  variant: ToastVariant
  title: string
  description?: string
  /** Auto-dismiss after this many ms. Pass `Infinity` to keep it until dismissed. */
  duration?: number
  /** Freezes the auto-dismiss timer, e.g. while the stack is hovered or focused. */
  paused?: boolean
  onDismiss?: () => void
  className?: string
}

const VARIANTS: Record<ToastVariant, { icon: React.ReactNode; label: string }> = {
  success: { icon: <CheckCircle2 size={16} className="text-lv-success" />, label: 'Success' },
  error: { icon: <XCircle size={16} className="text-lv-danger" />, label: 'Error' },
  warning: { icon: <AlertTriangle size={16} className="text-lv-warning" />, label: 'Warning' },
  info: { icon: <Info size={16} className="text-lv-info" />, label: 'Info' },
}

export function Toast({ variant, title, description, duration = 5000, paused = false, onDismiss, className }: ToastProps) {
  const remaining = useRef(duration)
  const dismissRef = useRef(onDismiss)
  dismissRef.current = onDismiss

  // Pausable countdown: elapsed time is subtracted each time the timer stops.
  useEffect(() => {
    if (paused || !Number.isFinite(remaining.current)) return
    const started = Date.now()
    const timer = window.setTimeout(() => dismissRef.current?.(), remaining.current)
    return () => {
      window.clearTimeout(timer)
      remaining.current -= Date.now() - started
    }
  }, [paused])

  const { icon, label } = VARIANTS[variant]
  const urgent = variant === 'error' || variant === 'warning'

  return (
    <div
      role={urgent ? 'alert' : 'status'}
      aria-live={urgent ? 'assertive' : 'polite'}
      aria-atomic="true"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.stopPropagation()
          onDismiss?.()
        }
      }}
      className={cn(
        'pointer-events-auto flex w-full items-start gap-2.5 rounded-lv-md border border-lv-border bg-lv-elevated py-2.5 pl-3 pr-2 text-lv-text shadow-lv-menu outline-none focus-visible:ring-2 focus-visible:ring-lv-accent',
        className
      )}
    >
      <span aria-hidden className="mt-[3px] flex shrink-0">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-small font-medium">
          <span className="sr-only">{label}: </span>
          {title}
        </p>
        {description && <p className="mt-0.5 text-caption text-lv-text-muted">{description}</p>}
      </div>
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={onDismiss}
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lv-sm text-lv-text-muted transition-colors duration-150 ease-out hover:bg-lv-hover hover:text-lv-text"
      >
        <X size={14} aria-hidden />
      </button>
    </div>
  )
}
