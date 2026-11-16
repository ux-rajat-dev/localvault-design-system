import React from 'react'
import { cn } from '../../lib/cn'
import { clampPercent } from './types'

export type ProgressTone = 'accent' | 'success' | 'warning' | 'error' | 'neutral'

export interface LinearProgressProps {
  /** 0–100. Ignored when indeterminate. */
  value?: number
  indeterminate?: boolean
  size?: 'sm' | 'md'
  tone?: ProgressTone
  /** Show the percentage to the right of the track. */
  showValue?: boolean
  /** Accessible name, e.g. "Uploading Q3-Report.pdf". */
  label?: string
  className?: string
}

export function LinearProgress({
  value = 0,
  indeterminate = false,
  size = 'md',
  tone = 'accent',
  showValue = false,
  label = 'Progress',
  className,
}: LinearProgressProps) {
  const pct = clampPercent(value)
  return (
    <div className={cn('flex w-full items-center gap-3', className)}>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={indeterminate ? undefined : Math.round(pct)}
        aria-busy={indeterminate || undefined}
        className={cn(
          'relative min-w-0 flex-1 overflow-hidden rounded-full bg-lv-track',
          size === 'sm' ? 'h-1' : 'h-1.5'
        )}
      >
        {indeterminate ? (
          <div className={cn('absolute inset-y-0 left-0 w-2/5 animate-pulse rounded-full', FILL[tone])} />
        ) : (
          <div
            className={cn(
              'h-full rounded-full transition-[width,background-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]',
              FILL[tone]
            )}
            style={{ width: `${pct}%` }}
          />
        )}
      </div>
      {showValue && (
        <span className="w-10 shrink-0 text-right text-caption font-medium tabular-nums text-lv-text-muted">
          {indeterminate ? '—' : `${Math.round(pct)}%`}
        </span>
      )}
    </div>
  )
}

const FILL: Record<ProgressTone, string> = {
  accent: 'bg-lv-accent',
  success: 'bg-lv-success',
  warning: 'bg-lv-warning',
  error: 'bg-lv-danger',
  neutral: 'bg-lv-text-muted',
}
