import React from 'react'
import { CircleAlert, Loader, Wifi, WifiOff } from 'lucide-react'
import { cn } from '../../lib/cn'
import type { DeviceConnectionStatus } from './types'

export interface DeviceStatusIndicatorProps {
  status: DeviceConnectionStatus
  /** `dot` — dot only · `dot-label` — dot + text · `icon-label` — icon + text */
  variant?: 'dot' | 'dot-label' | 'icon-label'
  /** Override the default label ("Online", "Offline"…). */
  label?: string
  className?: string
}

export function DeviceStatusIndicator({
  status,
  variant = 'dot-label',
  label,
  className,
}: DeviceStatusIndicatorProps) {
  const s = STATUS[status]
  const text = label ?? s.label

  if (variant === 'icon-label') {
    const Icon = s.icon
    return (
      <span className={cn('inline-flex items-center gap-1.5 whitespace-nowrap text-small font-medium', s.text, className)}>
        <Icon aria-hidden size={14} strokeWidth={2} className={cn('shrink-0', status === 'connecting' && 'lv-spin')} />
        {text}
      </span>
    )
  }

  const dot = (
    <span aria-hidden className="relative inline-flex size-2 shrink-0">
      {status === 'online' && (
        <span
          className="absolute inset-0 animate-ping rounded-full bg-lv-success opacity-75"
          style={{ animationDuration: '2.4s' }}
        />
      )}
      <span
        className={cn(
          'relative size-2 rounded-full',
          s.dot,
          status === 'connecting' && 'animate-pulse',
          status === 'offline' && 'border border-lv-text-muted bg-transparent'
        )}
      />
    </span>
  )

  if (variant === 'dot') {
    return (
      <span role="img" aria-label={text} title={text} className={cn('inline-flex', className)}>
        {dot}
      </span>
    )
  }

  return (
    <span className={cn('inline-flex items-center gap-2 whitespace-nowrap text-small font-medium', s.text, className)}>
      {dot}
      {text}
    </span>
  )
}

const STATUS: Record<DeviceConnectionStatus, { label: string; dot: string; text: string; icon: typeof Wifi }> = {
  online: { label: 'Online', dot: 'bg-lv-success', text: 'text-lv-success-fg', icon: Wifi },
  offline: { label: 'Offline', dot: 'bg-lv-text-muted', text: 'text-lv-text-muted', icon: WifiOff },
  connecting: { label: 'Connecting…', dot: 'bg-lv-accent', text: 'text-lv-accent-fg', icon: Loader },
  error: { label: 'Connection error', dot: 'bg-lv-danger', text: 'text-lv-danger-fg', icon: CircleAlert },
}
