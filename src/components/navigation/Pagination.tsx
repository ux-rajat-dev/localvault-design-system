import React from 'react'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface PaginationProps {
  /** 1-based. */
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  /** Used for the "51–100 of 1,284" range label. */
  pageSize?: number
  totalItems?: number
  /** A page request is in flight — controls lock, spinner shows. */
  loading?: boolean
  disabled?: boolean
  className?: string
}

/** Compact pager for large lists: range label, prev/next and a windowed page list. */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  pageSize,
  totalItems,
  loading = false,
  disabled = false,
  className,
}: PaginationProps) {
  const locked = disabled || loading
  const from = pageSize ? (page - 1) * pageSize + 1 : null
  const to = pageSize && totalItems ? Math.min(page * pageSize, totalItems) : null

  return (
    <nav
      aria-label="Pagination"
      aria-busy={loading || undefined}
      className={cn(
        'flex flex-wrap items-center justify-between gap-3 text-small text-lv-text-muted',
        className
      )}
    >
      <div className="flex items-center gap-2">
        {loading && <Loader2 size={14} className="animate-spin text-lv-accent" aria-hidden />}
        {from != null && to != null && totalItems != null ? (
          <span className="tabular-nums">
            Showing <strong className="font-medium text-lv-text">{from}</strong>–
            <strong className="font-medium text-lv-text">{to}</strong> of{' '}
            <strong className="font-medium text-lv-text">{fmt(totalItems)}</strong>
          </span>
        ) : (
          <span>
            Page <strong className="font-medium text-lv-text">{page}</strong> of{' '}
            <strong className="font-medium text-lv-text">{pageCount}</strong>
          </span>
        )}
      </div>

      <div className="flex items-center gap-1">
        <PagerButton
          label="Previous page"
          disabled={locked || page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft size={16} />
        </PagerButton>
        {windowed(page, pageCount).map((p, i) =>
          p === 'gap' ? (
            <span key={`gap-${i}`} aria-hidden className="w-6 text-center text-small text-lv-text-muted">
              …
            </span>
          ) : (
            <PagerButton
              key={p}
              label={`Page ${p}`}
              current={p === page}
              disabled={locked}
              onClick={() => onPageChange(p)}
            >
              {p}
            </PagerButton>
          )
        )}
        <PagerButton
          label="Next page"
          disabled={locked || page >= pageCount}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight size={16} />
        </PagerButton>
      </div>
    </nav>
  )
}

export interface LoadMoreProps {
  loaded: number
  total: number
  /** How many the next request adds — used in the button label. */
  step?: number
  loading?: boolean
  disabled?: boolean
  onLoadMore: () => void
  /** Optional, shown once everything is loaded. */
  onReset?: () => void
  noun?: string
}

/** Progressive loader for browsing views where position matters less than flow. */
export function LoadMore({
  loaded,
  total,
  step = 50,
  loading = false,
  disabled = false,
  onLoadMore,
  onReset,
  noun = 'items',
}: LoadMoreProps) {
  const done = loaded >= total
  const next = Math.min(step, total - loaded)
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-full max-w-xs">
        <div className="h-1 overflow-hidden rounded-lv-full bg-lv-text/[0.08]">
          <div
            className="h-full rounded-lv-full bg-lv-accent transition-[width] duration-200 ease-out"
            style={{ width: `${(Math.min(loaded, total) / total) * 100}%` }}
          />
        </div>
        <p className="mt-2 text-center text-caption text-lv-text-muted tabular-nums" aria-live="polite">
          {done ? `All ${fmt(total)} ${noun} loaded` : `Showing ${fmt(loaded)} of ${fmt(total)} ${noun}`}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onLoadMore}
          disabled={disabled || loading || done}
          aria-busy={loading || undefined}
          className="inline-flex h-8 min-w-[132px] items-center justify-center gap-2 whitespace-nowrap rounded-lv-sm border border-lv-border bg-lv-surface px-3 text-small font-medium text-lv-text shadow-lv-sm outline-none transition-[background-color,opacity] duration-100 ease-out enabled:hover:bg-lv-bg focus-visible:ring-2 focus-visible:ring-lv-accent/45 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading && <Loader2 size={14} className="animate-spin" aria-hidden />}
          {loading ? 'Loading…' : done ? 'Nothing more' : `Load ${next} more`}
        </button>
        {done && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="h-8 rounded-lv-sm px-2 text-small font-medium text-lv-accent outline-none hover:underline focus-visible:ring-2 focus-visible:ring-lv-accent/45"
          >
            Reset demo
          </button>
        )}
      </div>
    </div>
  )
}

function PagerButton({
  label,
  current,
  disabled,
  onClick,
  children,
}: {
  label: string
  current?: boolean
  disabled?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={current ? 'page' : undefined}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex h-7 min-w-7 items-center justify-center rounded-lv-sm px-1.5 text-small font-medium tabular-nums outline-none',
        'transition-[background-color,color] duration-100 ease-out focus-visible:ring-2 focus-visible:ring-lv-accent/45',
        current
          ? 'bg-lv-accent text-lv-on-accent'
          : 'text-lv-text-muted enabled:hover:bg-lv-text/[0.06] enabled:hover:text-lv-text',
        'disabled:cursor-not-allowed',
        disabled && !current && 'opacity-50'
      )}
    >
      {children}
    </button>
  )
}

/** 1 … 4 5 6 … 26 */
function windowed(page: number, count: number): Array<number | 'gap'> {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1)
  const pages = new Set([1, count, page - 1, page, page + 1])
  if (page <= 3) [2, 3, 4].forEach((p) => pages.add(p))
  if (page >= count - 2) [count - 3, count - 2, count - 1].forEach((p) => pages.add(p))
  const sorted = [...pages].filter((p) => p >= 1 && p <= count).sort((a, b) => a - b)
  const out: Array<number | 'gap'> = []
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push('gap')
    out.push(p)
  })
  return out
}

function fmt(n: number) {
  return n.toLocaleString('en-US')
}
