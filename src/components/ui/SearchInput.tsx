import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { Input, type InputProps } from './Input'

export interface SearchInputProps extends Omit<InputProps, 'value' | 'onChange' | 'leadingIcon' | 'trailingSlot' | 'type'> {
  value: string
  onValueChange: (value: string) => void
  /** Accessible name for the clear button. */
  clearLabel?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

/**
 * LocalVault SearchInput — search icon on the left, clear button once populated.
 * Escape clears a populated field.
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { value, onValueChange, clearLabel = 'Clear search', onKeyDown, disabled, onChange, ...rest },
  ref
) {
  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

  const clear = () => {
    onValueChange('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape' && value) {
      e.stopPropagation()
      clear()
    }
    onKeyDown?.(e)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value)
    onChange?.(e)
  }

  return (
    <Input
      ref={inputRef}
      type="search"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      leadingIcon={Search}
      trailingSlot={
        value && !disabled ? (
          <button
            type="button"
            tabIndex={-1}
            aria-label={clearLabel}
            onClick={clear}
            className="flex h-6 w-6 items-center justify-center rounded-lv-sm text-lv-text-muted outline-none hover:bg-lv-hover hover:text-lv-text focus-visible:ring-2 focus-visible:ring-lv-accent"
          >
            <X size={14} strokeWidth={2} aria-hidden />
          </button>
        ) : null
      }
      {...rest}
    />
  )
})
