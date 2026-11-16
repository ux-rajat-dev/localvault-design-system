import React from 'react'
import {
  ArrowRight,
  Ban,
  CheckCircle2,
  Clock,
  FileText,
  Loader,
  Pause,
  XCircle,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'
import { LinearProgress, type ProgressTone } from './LinearProgress'
import { StatusBadge } from './StatusBadge'
import type { FeedbackTone, TransferStatus } from './types'
import { formatBytes, formatDuration, formatSpeed } from './types'

export interface TransferProgressSummaryProps {
  fileName: string
  source: string
  destination: string
  transferredBytes: number
  totalBytes: number
  status: TransferStatus
  /** Bytes per second. Shown while transferring. */
  speed?: number
  /** Short reason shown when failed, e.g. "Destination disk is full". */
  errorMessage?: string
  /** Leading file icon; defaults to a document. */
  icon?: LucideIcon
  /** Trailing slot for compact actions (pause, retry…). */
  actions?: React.ReactNode
  className?: string
}

export function TransferProgressSummary({
  fileName,
  source,
  destination,
  transferredBytes,
  totalBytes,
  status,
  speed,
  errorMessage,
  icon: FileIcon = FileText,
  actions,
  className,
}: TransferProgressSummaryProps) {
  const cfg = STATUS[status]
  const pct = totalBytes > 0 ? (transferredBytes / totalBytes) * 100 : 0
  const remaining = speed && speed > 0 ? (totalBytes - transferredBytes) / speed : 0

  return (
    <div
      className={cn(
        'flex min-w-0 flex-col gap-2.5 rounded-lv-md border border-lv-border bg-lv-surface px-3.5 py-3',
        className
      )}
    >
      <div className="flex min-w-0 items-start gap-3">
        <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lv-sm bg-lv-surface-sunken text-lv-text-muted">
          <FileIcon aria-hidden size={16} strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-body font-medium text-lv-text" title={fileName}>
            {fileName}
          </p>
          <p className="flex min-w-0 items-center gap-1.5 text-caption text-lv-text-muted">
            <span className="truncate">{source}</span>
            <ArrowRight aria-hidden size={12} strokeWidth={2} className="shrink-0" />
            <span className="truncate">{destination}</span>
          </p>
        </div>
        <StatusBadge tone={cfg.tone} icon={cfg.icon} live={status === 'verifying'} size="sm" className="mt-0.5">
          {cfg.label}
        </StatusBadge>
        {actions && <div className="flex shrink-0 items-center gap-1">{actions}</div>}
      </div>

      <LinearProgress
        size="sm"
        value={status === 'completed' ? 100 : pct}
        indeterminate={status === 'verifying'}
        tone={cfg.bar}
        label={`${fileName} — ${cfg.label}`}
      />

      <div className="flex min-w-0 flex-wrap items-center justify-between gap-x-4 gap-y-1 text-caption tabular-nums">
        <span className={cn('min-w-0', status === 'failed' ? 'text-lv-danger-fg' : 'text-lv-text-muted')}>
          {detailText(status, transferredBytes, totalBytes, errorMessage)}
        </span>
        {status === 'transferring' && speed ? (
          <span className="text-lv-text-muted">
            <span className="font-medium text-lv-text">{formatSpeed(speed)}</span>
            <span className="mx-1.5">·</span>
            {formatDuration(remaining)}
          </span>
        ) : (
          <span className="text-lv-text-muted">{status === 'completed' ? formatBytes(totalBytes) : `${Math.round(pct)}%`}</span>
        )}
      </div>
    </div>
  )
}

function detailText(status: TransferStatus, done: number, total: number, error?: string) {
  const sizes = `${formatBytes(done)} of ${formatBytes(total)}`
  switch (status) {
    case 'queued':
      return `Waiting · ${formatBytes(total)}`
    case 'verifying':
      return 'Checking file integrity (SHA-256)…'
    case 'completed':
      return 'Transferred and verified'
    case 'paused':
      return `Paused at ${sizes}`
    case 'cancelled':
      return `Cancelled at ${sizes}`
    case 'failed':
      return error ?? `Stopped at ${sizes}`
    default:
      return sizes
  }
}

const STATUS: Record<TransferStatus, { label: string; tone: FeedbackTone; bar: ProgressTone; icon: LucideIcon }> = {
  queued: { label: 'Queued', tone: 'neutral', bar: 'neutral', icon: Clock },
  transferring: { label: 'Transferring', tone: 'progress', bar: 'accent', icon: ArrowRight },
  verifying: { label: 'Verifying', tone: 'info', bar: 'accent', icon: Loader },
  completed: { label: 'Completed', tone: 'success', bar: 'success', icon: CheckCircle2 },
  paused: { label: 'Paused', tone: 'warning', bar: 'warning', icon: Pause },
  cancelled: { label: 'Cancelled', tone: 'neutral', bar: 'neutral', icon: Ban },
  failed: { label: 'Failed', tone: 'error', bar: 'error', icon: XCircle },
}
