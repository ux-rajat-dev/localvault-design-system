import React from 'react'
import { Laptop, Monitor } from 'lucide-react'
import { cn } from '../../lib/cn'
import { InteractiveCard } from './InteractiveCard'

export type DevicePlatform = 'macos' | 'windows'
export type DeviceStatus = 'online' | 'offline'

export interface DeviceCardProps {
  name: string
  platform: DevicePlatform
  status: DeviceStatus
  /** e.g. "MacBook Pro 14″ · macOS 15" */
  model?: string
  /** Local network address, shown in mono. */
  address?: string
  /** Marks the machine LocalVault is running on. */
  isCurrent?: boolean
  /** Shown instead of the address while offline. */
  lastSeen?: string
  /** Optional storage display. Values are passed in; nothing is measured. */
  storage?: { usedGB: number; totalGB: number }
  selected?: boolean
  disabled?: boolean
  onSelect?: () => void
  onOpen?: () => void
}

export function DeviceCard({
  name,
  platform,
  status,
  model,
  address,
  isCurrent,
  lastSeen,
  storage,
  selected,
  disabled,
  onSelect,
  onOpen,
}: DeviceCardProps) {
  const Icon = platform === 'macos' ? Laptop : Monitor
  const online = status === 'online'
  const ratio = storage ? Math.min(storage.usedGB / storage.totalGB, 1) : 0
  const nearlyFull = ratio >= 0.85

  return (
    <InteractiveCard
      selected={selected}
      disabled={disabled}
      onSelect={onSelect}
      onOpen={onOpen}
      aria-label={`${name}, ${online ? 'online' : 'offline'}`}
      className="flex h-full flex-col gap-4"
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-lv-md border border-lv-border bg-lv-bg',
            online ? 'text-lv-text' : 'text-lv-text-muted'
          )}
        >
          <Icon size={20} strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-body font-semibold">{name}</p>
            {isCurrent && (
              <span className="shrink-0 rounded-lv-full border border-lv-border px-1.5 text-caption text-lv-text-muted">
                This device
              </span>
            )}
          </div>
          {model && <p className="truncate text-caption text-lv-text-muted">{model}</p>}
        </div>
        <span
          className={cn(
            'inline-flex shrink-0 items-center gap-1.5 text-caption font-medium',
            online ? 'text-lv-success' : 'text-lv-text-muted'
          )}
        >
          <span
            aria-hidden
            className={cn(
              'size-1.5 rounded-full',
              online ? 'bg-lv-success' : 'border border-lv-text-muted bg-transparent'
            )}
          />
          {online ? 'Online' : 'Offline'}
        </span>
      </div>

      {storage && (
        <div className="mt-auto">
          <div className="flex items-baseline justify-between gap-2 text-caption">
            <span className="text-lv-text-muted">Storage</span>
            <span className={cn('tabular-nums', nearlyFull ? 'text-lv-warning' : 'text-lv-text')}>
              {formatGB(storage.usedGB)} of {formatGB(storage.totalGB)}
            </span>
          </div>
          <div
            role="meter"
            aria-label={`${name} storage used`}
            aria-valuemin={0}
            aria-valuemax={storage.totalGB}
            aria-valuenow={storage.usedGB}
            className="mt-1.5 h-1.5 overflow-hidden rounded-lv-full bg-lv-text/[0.08]"
          >
            <div
              className={cn(
                'h-full rounded-lv-full',
                !online ? 'bg-lv-text-muted/60' : nearlyFull ? 'bg-lv-warning' : 'bg-lv-accent'
              )}
              style={{ width: `${ratio * 100}%` }}
            />
          </div>
        </div>
      )}

      {(address || lastSeen) && (
        <p
          className={cn(
            'border-t border-lv-border pt-3 text-caption text-lv-text-muted',
            !storage && 'mt-auto'
          )}
        >
          {online || !lastSeen ? <span className="font-mono">{address}</span> : lastSeen}
        </p>
      )}
    </InteractiveCard>
  )
}

function formatGB(gb: number) {
  return gb >= 1000 ? `${(gb / 1000).toFixed(gb % 1000 === 0 ? 0 : 2)} TB` : `${gb} GB`
}
