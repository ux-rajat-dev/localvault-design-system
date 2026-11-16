import React, { forwardRef, useId } from 'react'
import { cn } from '../../lib/cn'
import { Field, controlBoxClasses, describedBy } from './Field'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode
  helperText?: React.ReactNode
  error?: React.ReactNode
  /** Shows "length / maxLength" beside the label when maxLength is set. */
  showCount?: boolean
  wrapperClassName?: string
}

/**
 * LocalVault Textarea — same border, radius and focus treatment as Input.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    id,
    label,
    helperText,
    error,
    required,
    disabled,
    rows = 4,
    showCount = false,
    maxLength,
    value,
    className,
    wrapperClassName,
    'aria-describedby': ariaDescribedBy,
    ...rest
  },
  ref
) {
  const autoId = useId()
  const textareaId = id ?? `lv-textarea-${autoId}`
  const helperId = `${textareaId}-helper`
  const errorId = `${textareaId}-error`
  const length = typeof value === 'string' ? value.length : 0

  return (
    <Field
      htmlFor={textareaId}
      label={label}
      required={required}
      helperText={helperText}
      error={error}
      helperId={helperId}
      errorId={errorId}
      disabled={disabled}
      className={wrapperClassName}
      labelAside={
        showCount && maxLength ? (
          <span className="tabular-nums" aria-live="polite">
            {length} / {maxLength}
          </span>
        ) : undefined
      }
    >
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        value={value}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(error ? errorId : helperText ? helperId : null, ariaDescribedBy)}
        className={cn(
          controlBoxClasses({ error: Boolean(error), disabled }),
          'block min-h-[76px] w-full resize-y px-3 py-[7px] text-body outline-none placeholder:text-lv-text-subtle',
          error ? 'focus:shadow-[0_0_0_3px_var(--lv-danger-ring)]' : 'focus:border-lv-accent focus:hover:border-lv-accent focus:shadow-[0_0_0_3px_var(--lv-ring)]',
          className
        )}
        {...rest}
      />
    </Field>
  )
})
