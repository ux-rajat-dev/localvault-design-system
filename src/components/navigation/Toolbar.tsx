import React from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface ToolbarProps {
  title: React.ReactNode
  description?: React.ReactNode
  /** Left slot — history, sidebar toggle. */
  leading?: React.ReactNode
  /** Right slot — search, view switch, primary action. Wraps to its own row on narrow widths. */
  actions?: React.ReactNode
  /** Optional second row, e.g. breadcrumbs or tabs. */
  children?: React.ReactNode
  className?: string
}

export function Toolbar({ title, description, leading, actions, children, className }: ToolbarProps) {
  return (
    <header
      className={cn(
        'flex min-w-0 flex-col gap-2 border-b border-lv-border bg-lv-surface px-3 py-2.5 sm:px-4',
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        {leading && <div className="flex shrink-0 items-center gap-0.5">{leading}</div>}
        <div className="min-w-0 flex-1 basis-40">
          <h2 className="truncate text-body font-semibold text-lv-text">{title}</h2>
          {description && <p className="truncate text-caption text-lv-text-muted">{description}</p>}
        </div>
        {actions && (
          <div className="flex w-full min-w-0 items-center gap-2 sm:w-auto">{actions}</div>
        )}
      </div>
      {children && <div className="min-w-0 border-t border-lv-border pt-2">{children}</div>}
    </header>
  )
}

export interface ToolbarIconButtonProps {
  icon: LucideIcon
  /** Required — used as aria-label and tooltip. */
  label: string
  active?: boolean
  disabled?: boolean
  onClick?: () => void
}

export function ToolbarIconButton({ icon: Icon, label, active, disabled, onClick }: ToolbarIconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex size-8 shrink-0 items-center justify-center rounded-lv-sm outline-none',
        'transition-[background-color,color] duration-100 ease-out focus-visible:ring-2 focus-visible:ring-lv-accent/45',
        'disabled:cursor-not-allowed disabled:opacity-40',
        active
          ? 'bg-lv-text/[0.08] text-lv-text'
          : 'text-lv-text-muted enabled:hover:bg-lv-text/[0.06] enabled:hover:text-lv-text'
      )}
    >
      <Icon size={16} strokeWidth={1.75} />
    </button>
  )
}

export interface ToolbarButtonProps {
  children: React.ReactNode
  icon?: LucideIcon
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  onClick?: () => void
}

export function ToolbarButton({ children, icon: Icon, variant = 'primary', disabled, onClick }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lv-sm px-3 text-small font-medium outline-none',
        'transition-[background-color,opacity] duration-100 ease-out focus-visible:ring-2 focus-visible:ring-lv-accent/45 focus-visible:ring-offset-1 focus-visible:ring-offset-lv-surface',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variant === 'primary'
          ? 'bg-lv-accent text-lv-on-accent shadow-lv-sm enabled:hover:bg-lv-accent/90'
          : 'border border-lv-border bg-lv-surface text-lv-text enabled:hover:bg-lv-bg'
      )}
    >
      {Icon && <Icon size={16} strokeWidth={1.75} />}
      {children}
    </button>
  )
}

export function ToolbarDivider() {
  return <span aria-hidden className="mx-1 hidden h-5 w-px shrink-0 bg-lv-border sm:block" />
}
