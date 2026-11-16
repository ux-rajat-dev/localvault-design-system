import React from 'react'
import { cn } from '../../lib/cn'
import { clampPercent } from './types'
import type { ProgressTone } from './LinearProgress'

export interface CircularProgressProps {
  /** 0–100. Ignored when indeterminate. */
  value?: number
  indeterminate?: boolean
  /** `compact` 20px inline · `large` 56px with centred value */
  size?: 'compact' | 'large'
  tone?: ProgressTone
  /** Show the percentage in the centre (large only). */
  showValue?: boolean
  label?: string
  className?: string
}

export function CircularProgress({
  value = 0,
  indeterminate = false,
  size = 'compact',
  tone = 'accent',
  showValue = true,
  label = 'Progress',
  className,
}: CircularProgressProps) {
  const pct = clampPercent(value)
  const px = size === 'compact' ? 20 : 56
  const stroke = size === 'compact' ? 2.5 : 4
  const r = (px - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = indeterminate ? c * 0.72 : c * (1 - pct / 100)

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={indeterminate ? undefined : Math.round(pct)}
      aria-busy={indeterminate || undefined}
      className={cn('relative inline-grid shrink-0 place-items-center', className)}
      style={{ width: px, height: px }}
    >
      <svg
        width={px}
        height={px}
        viewBox={`0 0 ${px} ${px}`}
        className={cn('-rotate-90', indeterminate && 'lv-spin')}
        style={indeterminate ? { animationDuration: '1s' } : undefined}
      >
        <circle cx={px / 2} cy={px / 2} r={r} fill="none" strokeWidth={stroke} className="stroke-lv-track" />
        <circle
          cx={px / 2}
          cy={px / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className={cn(
            STROKE[tone],
            'transition-[stroke-dashoffset] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]'
          )}
        />
      </svg>
      {size === 'large' && showValue && !indeterminate && (
        <span className="absolute text-small font-semibold tabular-nums text-lv-text">{Math.round(pct)}%</span>
      )}
    </div>
  )
}

const STROKE: Record<ProgressTone, string> = {
  accent: 'stroke-lv-accent',
  success: 'stroke-lv-success',
  warning: 'stroke-lv-warning',
  error: 'stroke-lv-danger',
  neutral: 'stroke-lv-text-muted',
}
