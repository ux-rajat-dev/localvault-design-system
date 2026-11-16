import React from 'react'
import { cn } from '../../lib/cn'

export interface SkeletonLoaderProps {
  /** `text` lines · `file-rows` list rows · `card` content card · `device-card` device tile */
  variant?: 'text' | 'file-rows' | 'card' | 'device-card'
  /** Lines for `text`, rows for `file-rows`. */
  count?: number
  label?: string
  className?: string
}

export function SkeletonLoader({ variant = 'text', count = 3, label = 'Loading content', className }: SkeletonLoaderProps) {
  return (
    <div role="status" aria-busy="true" aria-label={label} className={cn('w-full', className)}>
      {variant === 'text' && (
        <div className="flex flex-col gap-2.5">
          {Array.from({ length: count }).map((_, i) => (
            <Bone key={i} className="h-3" style={{ width: i === count - 1 ? '58%' : `${92 - (i % 3) * 7}%` }} />
          ))}
        </div>
      )}

      {variant === 'file-rows' && (
        <div className="divide-y divide-lv-border">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5">
              <Bone className="size-7 rounded-lv-sm" />
              <Bone className="h-3" style={{ width: `${44 - (i % 3) * 8}%` }} />
              <div className="ml-auto flex items-center gap-6">
                <Bone className="hidden h-3 w-16 sm:block" />
                <Bone className="h-3 w-12" />
              </div>
            </div>
          ))}
        </div>
      )}

      {variant === 'card' && (
        <div className="flex flex-col gap-4 rounded-lv-lg border border-lv-border bg-lv-surface p-4">
          <div className="flex items-center gap-3">
            <Bone className="size-9 rounded-lv-sm" />
            <div className="flex flex-1 flex-col gap-2">
              <Bone className="h-3 w-1/2" />
              <Bone className="h-2.5 w-1/3" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Bone className="h-2.5 w-full" />
            <Bone className="h-2.5 w-4/5" />
          </div>
          <Bone className="h-7 w-24 rounded-lv-sm" />
        </div>
      )}

      {variant === 'device-card' && (
        <div className="flex items-center gap-3 rounded-lv-md border border-lv-border bg-lv-surface px-3 py-2.5">
          <Bone className="size-9 rounded-lv-sm" />
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <Bone className="h-3 w-28" />
              <Bone className="h-3 w-16 rounded-full" />
            </div>
            <Bone className="h-2.5 w-24" />
          </div>
        </div>
      )}
      <span className="sr-only">{label}</span>
    </div>
  )
}

function Bone({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <span aria-hidden className={cn('lv-skeleton-bone block rounded-lv-sm', className)} style={style} />
}
