import React from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface FieldProps {
  /** Id of the control the label points at. */
  htmlFor?: string
  /** Id given to the label element, for controls that use aria-labelledby. */
  labelId?: string
  label?: React.ReactNode
  required?: boolean
  helperText?: React.ReactNode
  error?: React.ReactNode
  helperId?: string
  errorId?: string
  /** Extra content on the right of the label row, e.g. a character count. */
  labelAside?: React.ReactNode
  disabled?: boolean
  className?: string
  children: React.ReactNode
}

/**
 * LocalVault Field — the label / helper / error frame shared by every form control.
 */
export function Field({
  htmlFor,
  labelId,
  label,
  required,
  helperText,
  error,
  helperId,
  errorId,
  labelAside,
  disabled,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cn('lv-field flex min-w-0 flex-col gap-1.5', className)}>
      {(label || labelAside) && (
        <div className="flex items-baseline justify-between gap-3">
          {label && (
            <label
              id={labelId}
              htmlFor={htmlFor}
              className={cn(
                'text-small font-medium leading-[20px] text-lv-text',
                disabled && 'text-lv-text-muted'
              )}
            >
              {label}
              {required && (
                <>
                  <span aria-hidden className="ml-0.5 text-lv-danger">
                    *
                  </span>
                  <span className="sr-only"> (required)</span>
                </>
              )}
            </label>
          )}
          {labelAside && <div className="text-caption text-lv-text-muted">{labelAside}</div>}
        </div>
      )}
      {children}
      {error ? (
        <p id={errorId} className="flex items-start gap-1.5 text-caption text-lv-danger">
          <AlertCircle aria-hidden size={14} strokeWidth={2} className="mt-[2px] shrink-0" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-caption text-lv-text-muted">
          {helperText}
        </p>
      ) : null}
    </div>
  )
}

/** Classes for the bordered control box (input wrapper, textarea, select trigger). */
export function controlBoxClasses({ error, disabled }: { error?: boolean; disabled?: boolean } = {}) {
  return cn(
    'rounded-lv-md border bg-lv-surface text-body text-lv-text shadow-lv-sm',
    'transition-[border-color,box-shadow,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]',
    error
      ? 'border-lv-danger focus-within:shadow-[0_0_0_3px_var(--lv-danger-ring)]'
      : 'border-lv-border hover:border-lv-border-strong focus-within:border-lv-accent focus-within:hover:border-lv-accent focus-within:shadow-[0_0_0_3px_var(--lv-ring)]',
    disabled && 'cursor-not-allowed border-lv-border bg-lv-disabled-bg text-lv-text-muted shadow-none hover:border-lv-border'
  )
}

export function describedBy(...ids: Array<string | false | undefined | null>) {
  const value = ids.filter(Boolean).join(' ')
  return value || undefined
}
