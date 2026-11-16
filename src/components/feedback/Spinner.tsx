import React from 'react'
import { cn } from '../../lib/cn'

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  /** Accessible status text, announced politely. */
  label?: string
  className?: string
}

export function Spinner({ size = 'md', label = 'Loading', className }: SpinnerProps) {
  const px = size === 'sm' ? 14 : size === 'md' ? 20 : 32
  const stroke = size === 'lg' ? 3 : 2
  const r = (px - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <span role="status" aria-live="polite" className={cn('inline-flex shrink-0', className)}>
      <svg width={px} height={px} viewBox={`0 0 ${px} ${px}`} className="lv-spin" aria-hidden>
        <circle cx={px / 2} cy={px / 2} r={r} fill="none" strokeWidth={stroke} className="stroke-lv-accent/20" />
        <circle
          cx={px / 2}
          cy={px / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${c * 0.28} ${c}`}
          className="stroke-lv-accent"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  )
}
