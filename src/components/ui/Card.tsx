import React from 'react'
import { cn } from '../../lib/cn'

export type CardVariant = 'default' | 'outlined' | 'elevated'
export type CardPadding = 'compact' | 'standard' | 'spacious'

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** default: surface + border · outlined: border only · elevated: surface + medium shadow */
  variant?: CardVariant
  /** compact 12px · standard 16px · spacious 24px */
  padding?: CardPadding
  /** Optional header region, separated by a hairline. */
  header?: React.ReactNode
  /** Optional footer region, separated by a hairline. Pinned to the bottom. */
  footer?: React.ReactNode
}

export function Card({
  variant = 'default',
  padding = 'standard',
  header,
  footer,
  children,
  className,
  ...rest
}: CardProps) {
  return (
    <div
      className={cn(
        'flex min-w-0 flex-col rounded-lv-lg text-lv-text',
        VARIANT[variant],
        className
      )}
      {...rest}
    >
      {header != null && (
        <div className={cn('border-b border-lv-border', EDGE_PADDING[padding])}>{header}</div>
      )}
      {children != null && <div className={cn('flex-1', BODY_PADDING[padding])}>{children}</div>}
      {footer != null && (
        <div className={cn('mt-auto border-t border-lv-border', EDGE_PADDING[padding])}>
          {footer}
        </div>
      )}
    </div>
  )
}

export interface CardHeadingProps {
  title: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
}

/** Standard title row for a card header. */
export function CardHeading({ title, description, actions }: CardHeadingProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h3 className="truncate text-body font-semibold text-lv-text">{title}</h3>
        {description && <p className="text-caption text-lv-text-muted">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-1">{actions}</div>}
    </div>
  )
}

const VARIANT: Record<CardVariant, string> = {
  default: 'border border-lv-border bg-lv-surface',
  outlined: 'border border-lv-border bg-transparent',
  elevated: 'border border-lv-border/60 bg-lv-surface shadow-lv-md',
}

export const BODY_PADDING: Record<CardPadding, string> = {
  compact: 'p-3',
  standard: 'p-4',
  spacious: 'p-6',
}

const EDGE_PADDING: Record<CardPadding, string> = {
  compact: 'px-3 py-2',
  standard: 'px-4 py-3',
  spacious: 'px-6 py-4',
}
