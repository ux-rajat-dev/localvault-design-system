import React from 'react'
import { Laptop, Monitor } from 'lucide-react'
import { cn } from '../../lib/cn'
import { DeviceStatusIndicator } from './DeviceStatusIndicator'
import type { DeviceConnectionStatus, DeviceKind } from './types'

export interface DeviceConnectionSummaryProps {
  name: string
  kind: DeviceKind
  status: DeviceConnectionStatus
  /** e.g. "Last seen 14 min ago" — shown when not online. */
  lastSeen?: string
  /** Secondary detail such as an address, e.g. "192.168.1.24". */
  detail?: string
  /** Trailing slot for a compact action. */
  action?: React.ReactNode
  className?: string
}

export function DeviceConnectionSummary({
  name,
  kind,
  status,
  lastSeen,
  detail,
  action,
  className,
}: DeviceConnectionSummaryProps) {
  const Icon = kind === 'mac' ? Laptop : Monitor
  const label = status === 'online' ? 'Connected' : status === 'offline' ? 'Offline' : undefined
  const meta = status === 'online' ? detail : lastSeen ?? detail
  return (
    <div
      className={cn(
        'flex min-w-0 items-center gap-3 rounded-lv-md border border-lv-border bg-lv-surface px-3 py-2.5',
        className
      )}
    >
      <span
        className={cn(
          'grid size-9 shrink-0 place-items-center rounded-lv-sm border border-lv-border bg-lv-surface-sunken',
          status === 'online' ? 'text-lv-text' : 'text-lv-text-muted'
        )}
      >
        <Icon aria-hidden size={18} strokeWidth={1.75} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-0.5">
          <span className="truncate text-body font-semibold text-lv-text">{name}</span>
          <DeviceStatusIndicator status={status} label={label} />
        </div>
        {meta && <p className="truncate text-caption text-lv-text-muted">{meta}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
