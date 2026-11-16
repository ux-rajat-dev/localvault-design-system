import React from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'
import type { FeedbackTone } from './types'

export interface StatusBadgeProps {
  tone?: FeedbackTone
  size?: 'sm' | 'md'
  shape?: 'pill' | 'rect'
  /** Leading Lucide icon. Takes precedence over `dot`. */
  icon?: LucideIcon
  /** Show a small status dot before the label. */
  dot?: boolean
  /** Animate the dot or icon — use for live states such as Transferring. */
  live?: boolean
  className?: string
  children: React.ReactNode
}

export function StatusBadge({
  tone = 'neutral',
  size = 'md',
  shape = 'pill',
  icon: Icon,
  dot = false,
  live = false,
  className,
  children,
}: StatusBadgeProps) {
  const t = TONES[tone]
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center whitespace-nowrap border font-medium',
        t.box,
        size === 'sm' ? 'h-5 gap-1 px-1.5 text-caption' : 'h-6 gap-1.5 px-2 text-small',
        shape === 'pill' ? 'rounded-full' : 'rounded-lv-sm',
        size === 'sm' && shape === 'pill' && 'px-2',
        className
      )}
    >
      {Icon ? (
        <Icon
          aria-hidden
          size={size === 'sm' ? 12 : 14}
          strokeWidth={2}
          className={cn('shrink-0', live && 'lv-spin')}
        />
      ) : dot ? (
        <span aria-hidden className="relative inline-flex size-1.5 shrink-0">
          {live && <span className={cn('absolute inset-0 animate-ping rounded-full opacity-75', t.dot)} />}
          <span className={cn('relative size-1.5 rounded-full', t.dot)} />
        </span>
      ) : null}
      {children}
    </span>
  )
}

const TONES: Record<FeedbackTone, { box: string; dot: string }> = {
  success: { box: 'bg-lv-success-subtle border-lv-success-line text-lv-success-fg', dot: 'bg-lv-success' },
  warning: { box: 'bg-lv-warning-subtle border-lv-warning-line text-lv-warning-fg', dot: 'bg-lv-warning' },
  error: { box: 'bg-lv-danger-subtle border-lv-danger-line text-lv-danger-fg', dot: 'bg-lv-danger' },
  info: { box: 'bg-lv-info-subtle border-lv-info-line text-lv-info-fg', dot: 'bg-lv-info' },
  neutral: { box: 'bg-lv-surface-sunken border-lv-border text-lv-text-muted', dot: 'bg-lv-text-muted' },
  progress: { box: 'bg-lv-accent-subtle border-lv-accent-line text-lv-accent-fg', dot: 'bg-lv-accent' },
}
