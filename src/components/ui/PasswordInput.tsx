import React, { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input, type InputProps } from './Input'

export interface PasswordInputProps extends Omit<InputProps, 'type' | 'trailingSlot'> {
  /** Accessible names for the reveal toggle. */
  showLabel?: string
  hideLabel?: string
}

/**
 * LocalVault PasswordInput — hidden by default, Eye / EyeOff toggle switches the input type.
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(function PasswordInput(
  { showLabel = 'Show password', hideLabel = 'Hide password', disabled, autoComplete = 'current-password', ...rest },
  ref
) {
  const [visible, setVisible] = useState(false)
  const Icon = visible ? EyeOff : Eye

  return (
    <Input
      ref={ref}
      type={visible ? 'text' : 'password'}
      disabled={disabled}
      autoComplete={autoComplete}
      trailingSlot={
        <button
          type="button"
          tabIndex={-1}
          disabled={disabled}
          aria-label={visible ? hideLabel : showLabel}
          aria-pressed={visible}
          onClick={() => setVisible((v) => !v)}
          className="flex h-7 w-7 items-center justify-center rounded-lv-sm text-lv-text-muted outline-none hover:bg-lv-hover hover:text-lv-text focus-visible:ring-2 focus-visible:ring-lv-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon size={16} strokeWidth={1.85} aria-hidden />
        </button>
      }
      {...rest}
    />
  )
})
