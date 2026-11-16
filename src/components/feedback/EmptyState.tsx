import React from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: React.ReactNode
  /** Slot for a primary and optional secondary action. */
  action?: React.ReactNode
  size?: 'compact' | 'default'
  className?: string
}

export function EmptyState({ icon: Icon, title, description, action, size = 'default', className }: EmptyStateProps) {
  const compact = size === 'compact'
  return (
    <div
      className={cn(
        'flex flex-col items-center text-center',
        compact ? 'gap-2 px-4 py-6' : 'gap-3 px-6 py-10',
        className
      )}
    >
      {Icon && (
        <span
          className={cn(
            'grid place-items-center rounded-lv-md border border-lv-border bg-lv-surface-sunken text-lv-text-muted',
            compact ? 'size-9' : 'size-11'
          )}
        >
          <Icon aria-hidden size={compact ? 18 : 20} strokeWidth={1.75} />
        </span>
      )}
      <div className="flex max-w-[34ch] flex-col gap-1">
        <p className={cn('font-semibold text-lv-text', compact ? 'text-body' : 'text-h3')}>{title}</p>
        {description && <p className="text-small text-lv-text-muted">{description}</p>}
      </div>
      {action && <div className="mt-auto flex pt-1 flex-wrap items-center justify-center gap-2">{action}</div>}
    </div>
  )
}
