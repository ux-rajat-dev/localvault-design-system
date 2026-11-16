import React from 'react'
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'

export type AlertTone = 'success' | 'warning' | 'error' | 'info'

export interface InlineAlertProps {
  tone?: AlertTone
  title?: string
  children?: React.ReactNode
  /** Override the default leading icon. */
  icon?: LucideIcon
  /** Renders a dismiss button when provided. */
  onDismiss?: () => void
  /** Slot for one or two compact actions. */
  action?: React.ReactNode
  className?: string
}

export function InlineAlert({
  tone = 'info',
  title,
  children,
  icon,
  onDismiss,
  action,
  className,
}: InlineAlertProps) {
  const t = TONES[tone]
  const Icon = icon ?? t.icon
  return (
    <div
      role={tone === 'error' || tone === 'warning' ? 'alert' : 'status'}
      className={cn('flex items-start gap-3 rounded-lv-md border px-3.5 py-3', t.box, className)}
    >
      <Icon aria-hidden size={16} strokeWidth={2} className={cn('mt-[3px] shrink-0', t.icon_c)} />
      <div className="min-w-0 flex-1">
        {title && <p className="text-body font-semibold text-lv-text">{title}</p>}
        {children && <div className="text-small text-lv-text-muted">{children}</div>}
        {action && <div className="mt-2.5 flex flex-wrap items-center gap-2">{action}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="-mr-1 -mt-0.5 grid size-6 shrink-0 place-items-center rounded-lv-sm text-lv-text-muted transition-colors duration-150 hover:bg-lv-surface-sunken hover:text-lv-text focus-visible:outline-2 focus-visible:outline-lv-accent"
        >
          <X aria-hidden size={14} strokeWidth={2} />
        </button>
      )}
    </div>
  )
}

const TONES: Record<AlertTone, { box: string; icon_c: string; icon: LucideIcon }> = {
  success: { box: 'bg-lv-success-subtle border-lv-success-line', icon_c: 'text-lv-success-fg', icon: CheckCircle2 },
  warning: { box: 'bg-lv-warning-subtle border-lv-warning-line', icon_c: 'text-lv-warning-fg', icon: AlertTriangle },
  error: { box: 'bg-lv-danger-subtle border-lv-danger-line', icon_c: 'text-lv-danger-fg', icon: XCircle },
  info: { box: 'bg-lv-info-subtle border-lv-info-line', icon_c: 'text-lv-info-fg', icon: Info },
}
