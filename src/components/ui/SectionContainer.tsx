import React from 'react'
import { cn } from '../../lib/cn'

export interface SectionContainerProps {
  title: React.ReactNode
  description?: React.ReactNode
  /** Right-aligned slot beside the heading. Wraps below on narrow widths. */
  actions?: React.ReactNode
  /** Heading level. h2 renders at H2 (22px), h3 at H3 (18px). */
  level?: 'h2' | 'h3'
  className?: string
  children?: React.ReactNode
}

export function SectionContainer({
  title,
  description,
  actions,
  level = 'h2',
  className,
  children,
}: SectionContainerProps) {
  const Heading = level
  return (
    <section className={cn('flex min-w-0 flex-col', className)}>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div className="min-w-0 max-w-2xl">
          <Heading
            className={cn(
              'font-semibold tracking-tight text-lv-text',
              level === 'h2' ? 'text-h2' : 'text-h3'
            )}
          >
            {title}
          </Heading>
          {description && (
            <p className={cn('text-lv-text-muted', level === 'h2' ? 'mt-1 text-body' : 'text-small')}>
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
      {children != null && (
        <div className={cn('flex min-w-0 flex-col', level === 'h2' ? 'mt-5 gap-4' : 'mt-4 gap-3')}>
          {children}
        </div>
      )}
    </section>
  )
}
