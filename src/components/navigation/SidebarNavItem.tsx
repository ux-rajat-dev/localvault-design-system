import React from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface SidebarNavItemProps {
  icon: LucideIcon
  label: string
  active?: boolean
  disabled?: boolean
  /** Icon-only. The label moves to aria-label and a native tooltip. */
  compact?: boolean
  /** Optional trailing count. Hidden in compact mode. */
  count?: number
  /** Optional connection dot, for device items. */
  status?: 'online' | 'offline'
  onClick?: () => void
}

export function SidebarNavItem({
  icon: Icon,
  label,
  active = false,
  disabled = false,
  compact = false,
  count,
  status,
  onClick,
}: SidebarNavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-current={active ? 'page' : undefined}
      aria-label={compact ? label : undefined}
      title={compact ? label : undefined}
      className={cn(
        'group relative flex h-8 min-w-0 items-center rounded-lv-sm text-small font-medium outline-none',
        'transition-[background-color,color] duration-100 ease-out',
        'focus-visible:ring-2 focus-visible:ring-lv-accent/45',
        compact ? 'w-9 justify-center' : 'w-full gap-2.5 px-2',
        disabled
          ? 'cursor-not-allowed text-lv-text-muted opacity-50'
          : active
            ? 'bg-lv-accent/[0.12] text-lv-text'
            : 'text-lv-text-muted hover:bg-lv-text/[0.05] hover:text-lv-text'
      )}
    >
      <span className="relative shrink-0">
        <Icon
          size={16}
          strokeWidth={1.75}
          className={cn(active && !disabled ? 'text-lv-accent' : 'text-current')}
        />
        {status && compact && (
          <span
            aria-hidden
            className={cn(
              'absolute -right-1 -bottom-0.5 size-1.5 rounded-full ring-2 ring-lv-surface',
              status === 'online' ? 'bg-lv-success' : 'bg-lv-text-muted'
            )}
          />
        )}
      </span>
      {!compact && (
        <>
          <span className="min-w-0 flex-1 truncate whitespace-nowrap text-left">{label}</span>
          {status && (
            <span
              aria-label={status === 'online' ? 'Online' : 'Offline'}
              className={cn(
                'size-1.5 shrink-0 rounded-full',
                status === 'online' ? 'bg-lv-success' : 'border border-lv-text-muted'
              )}
            />
          )}
          {count != null && (
            <span className="shrink-0 text-caption text-lv-text-muted tabular-nums">
              {count.toLocaleString('en-US')}
            </span>
          )}
        </>
      )}
    </button>
  )
}
