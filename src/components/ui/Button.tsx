import React, { forwardRef } from 'react'
import { Loader2, type LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Shows a spinner, sets aria-busy and blocks interaction. */
  loading?: boolean
  /** Lucide icon rendered before the label. */
  leadingIcon?: LucideIcon
  /** Lucide icon rendered after the label. */
  trailingIcon?: LucideIcon
  /** Renders a square icon-only button. Always pass `aria-label` with it. */
  icon?: LucideIcon
  fullWidth?: boolean
}

/**
 * LocalVault Button (Canonical Implementation).
 * Variants: primary · secondary · outline · ghost · destructive (or danger alias)
 * Sizes: sm 30px · md 36px · lg 42px
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    leadingIcon: Leading,
    trailingIcon: Trailing,
    icon: IconOnly,
    fullWidth = false,
    disabled,
    type = 'button',
    className,
    children,
    ...rest
  },
  ref
) {
  const iconSize = ICON_SIZE[size]
  const isIconOnly = Boolean(IconOnly)
  const isDisabled = disabled || loading
  const normalizedVariant = variant === 'danger' ? 'destructive' : variant

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      data-variant={normalizedVariant}
      data-size={size}
      className={cn(
        'lv-button relative inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap rounded-lv-md font-medium',
        'transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]',
        'outline-none focus-visible:shadow-[0_0_0_2px_var(--lv-surface),0_0_0_4px_var(--lv-accent)]',
        'enabled:active:scale-[0.98] disabled:cursor-not-allowed',
        SIZE[size],
        isIconOnly ? ICON_ONLY_SIZE[size] : '',
        VARIANT[normalizedVariant],
        loading ? 'cursor-progress' : 'disabled:opacity-50',
        fullWidth ? 'w-full' : '',
        className
      )}
      {...rest}
    >
      {isIconOnly && IconOnly ? (
        loading ? (
          <Loader2 aria-hidden size={iconSize} strokeWidth={2} className="animate-spin" />
        ) : (
          <IconOnly aria-hidden size={iconSize} strokeWidth={1.85} />
        )
      ) : (
        <>
          {loading ? (
            <Loader2 aria-hidden size={iconSize} strokeWidth={2} className="-ml-0.5 animate-spin" />
          ) : Leading ? (
            <Leading aria-hidden size={iconSize} strokeWidth={1.85} className="-ml-0.5" />
          ) : null}
          {children && <span className="truncate">{children}</span>}
          {Trailing && <Trailing aria-hidden size={iconSize} strokeWidth={1.85} className="-mr-0.5" />}
        </>
      )}
    </button>
  )
})

const ICON_SIZE: Record<ButtonSize, number> = { sm: 14, md: 16, lg: 18 }

const SIZE: Record<ButtonSize, string> = {
  sm: 'h-[30px] gap-1.5 px-2.5 text-small leading-[20px]',
  md: 'h-9 gap-2 px-3.5 text-body leading-[22px]',
  lg: 'h-[42px] gap-2 px-4 text-body leading-[22px]',
}

const ICON_ONLY_SIZE: Record<ButtonSize, string> = {
  sm: 'w-[30px] px-0',
  md: 'w-9 px-0',
  lg: 'w-[42px] px-0',
}

const VARIANT: Record<'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive', string> = {
  primary:
    'bg-lv-accent text-lv-on-accent shadow-lv-sm enabled:hover:bg-lv-accent-hover enabled:active:bg-lv-accent-active',
  secondary:
    'border border-lv-border bg-lv-neutral text-lv-text enabled:hover:bg-lv-neutral-hover enabled:hover:border-lv-border-strong',
  outline:
    'border border-lv-border-strong bg-transparent text-lv-text enabled:hover:bg-lv-hover enabled:active:bg-lv-active',
  ghost: 'bg-transparent text-lv-text enabled:hover:bg-lv-hover enabled:active:bg-lv-active',
  destructive:
    'bg-lv-danger text-white shadow-lv-sm enabled:hover:bg-lv-danger-hover enabled:active:bg-lv-danger-active focus-visible:shadow-[0_0_0_2px_var(--lv-surface),0_0_0_4px_var(--lv-danger)]',
}
