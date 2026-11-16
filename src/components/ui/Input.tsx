import React, { forwardRef, useId } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Field, controlBoxClasses, describedBy } from './Field'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode
  helperText?: React.ReactNode
  /** Error message. When set, the field turns red and is marked aria-invalid. */
  error?: React.ReactNode
  /** Lucide icon shown inside the field, on the left. */
  leadingIcon?: LucideIcon
  /** Interactive content inside the field, on the right (clear, reveal…). */
  trailingSlot?: React.ReactNode
  labelAside?: React.ReactNode
  /** Classes for the outer field wrapper. */
  wrapperClassName?: string
}

/**
 * LocalVault text Input — 36px, 10px radius, 1px --lv-border, --lv-surface fill.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    id,
    label,
    helperText,
    error,
    required,
    disabled,
    leadingIcon: Leading,
    trailingSlot,
    labelAside,
    className,
    wrapperClassName,
    'aria-describedby': ariaDescribedBy,
    ...rest
  },
  ref
) {
  const autoId = useId()
  const inputId = id ?? `lv-input-${autoId}`
  const helperId = `${inputId}-helper`
  const errorId = `${inputId}-error`

  return (
    <Field
      htmlFor={inputId}
      label={label}
      required={required}
      helperText={helperText}
      error={error}
      helperId={helperId}
      errorId={errorId}
      labelAside={labelAside}
      disabled={disabled}
      className={wrapperClassName}
    >
      <div
        className={cn(
          controlBoxClasses({ error: Boolean(error), disabled }),
          'flex h-9 items-center gap-2 px-3',
          trailingSlot ? 'pr-1.5' : ''
        )}
      >
        {Leading && (
          <Leading aria-hidden size={16} strokeWidth={1.85} className="shrink-0 text-lv-text-muted" />
        )}
        <input
          ref={ref}
          id={inputId}
          required={required}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(error ? errorId : helperText ? helperId : null, ariaDescribedBy)}
          className={cn(
            'h-full min-w-0 flex-1 bg-transparent text-body text-lv-text outline-none placeholder:text-lv-text-subtle disabled:cursor-not-allowed disabled:text-lv-text-muted',
            className
          )}
          {...rest}
        />
        {trailingSlot}
      </div>
    </Field>
  )
})
