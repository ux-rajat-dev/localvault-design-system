import React, { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, ChevronDown, type LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Field, controlBoxClasses, describedBy } from './Field'

export interface SelectOption {
  value: string
  label: string
  description?: string
  icon?: LucideIcon
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  value: string | null
  onValueChange: (value: string) => void
  label?: React.ReactNode
  placeholder?: string
  helperText?: React.ReactNode
  error?: React.ReactNode
  required?: boolean
  disabled?: boolean
  id?: string
  /** Submits the value with a surrounding form. */
  name?: string
  className?: string
}

/**
 * LocalVault Select — button + listbox (ARIA combobox pattern).
 * Keyboard: ↑ ↓ Home End to move, Enter / Space to choose, Esc / Tab to close,
 * and type-to-jump matching.
 */
export function Select({
  options,
  value,
  onValueChange,
  label,
  placeholder = 'Select an option',
  helperText,
  error,
  required,
  disabled,
  id,
  name,
  className,
}: SelectProps) {
  const autoId = useId()
  const baseId = id ?? `lv-select-${autoId}`
  const labelId = `${baseId}-label`
  const listId = `${baseId}-listbox`
  const helperId = `${baseId}-helper`
  const errorId = `${baseId}-error`

  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const typeahead = useRef({ text: '', at: 0 })
  const reduceMotion = useReducedMotion()

  const selected = options.find((o) => o.value === value) ?? null
  const SelectedIcon = selected?.icon

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  const openList = (index?: number) => {
    if (disabled) return
    const selectedIndex = options.findIndex((o) => o.value === value)
    setActiveIndex(index ?? (selectedIndex >= 0 ? selectedIndex : firstEnabled(options)))
    setOpen(true)
  }

  const choose = (index: number) => {
    const option = options[index]
    if (!option || option.disabled) return
    onValueChange(option.value)
    setOpen(false)
    triggerRef.current?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault()
        openList()
      }
      return
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex((i) => step(options, i, 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex((i) => step(options, i, -1))
        break
      case 'Home':
        e.preventDefault()
        setActiveIndex(firstEnabled(options))
        break
      case 'End':
        e.preventDefault()
        setActiveIndex(step(options, options.length, -1))
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        choose(activeIndex)
        break
      case 'Escape':
        e.preventDefault()
        setOpen(false)
        break
      case 'Tab':
        setOpen(false)
        break
      default:
        if (e.key.length === 1 && /\S/.test(e.key)) {
          const now = Date.now()
          const t = typeahead.current
          t.text = now - t.at > 600 ? e.key.toLowerCase() : t.text + e.key.toLowerCase()
          t.at = now
          const match = options.findIndex((o) => !o.disabled && o.label.toLowerCase().startsWith(t.text))
          if (match >= 0) setActiveIndex(match)
        }
    }
  }

  return (
    <Field
      labelId={labelId}
      htmlFor={baseId}
      label={label}
      required={required}
      helperText={helperText}
      error={error}
      helperId={helperId}
      errorId={errorId}
      disabled={disabled}
      className={className}
    >
      <div ref={rootRef} className="relative">
        <button
          ref={triggerRef}
          id={baseId}
          type="button"
          role="combobox"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-labelledby={label ? `${labelId} ${baseId}` : undefined}
          aria-activedescendant={open && activeIndex >= 0 ? `${baseId}-opt-${activeIndex}` : undefined}
          aria-invalid={error ? true : undefined}
          aria-required={required || undefined}
          aria-describedby={describedBy(error ? errorId : helperText ? helperId : null)}
          onClick={() => (open ? setOpen(false) : openList())}
          onKeyDown={onKeyDown}
          className={cn(
            controlBoxClasses({ error: Boolean(error), disabled }),
            'flex h-9 w-full items-center gap-2 pl-3 pr-2.5 text-left outline-none',
            error
              ? 'focus-visible:shadow-[0_0_0_3px_var(--lv-danger-ring)]'
              : 'focus-visible:border-lv-accent focus-visible:shadow-[0_0_0_3px_var(--lv-ring)]',
            open && !error && 'border-lv-accent shadow-[0_0_0_3px_var(--lv-ring)] hover:border-lv-accent'
          )}
        >
          {SelectedIcon && (
            <SelectedIcon aria-hidden size={16} strokeWidth={1.85} className="shrink-0 text-lv-text-muted" />
          )}
          <span className={cn('min-w-0 flex-1 truncate text-body', !selected && 'text-lv-text-subtle')}>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronDown
            aria-hidden
            size={16}
            strokeWidth={1.85}
            className={cn(
              'shrink-0 text-lv-text-muted transition-transform duration-150 ease-out',
              open && 'rotate-180'
            )}
          />
        </button>
        {name && <input type="hidden" name={name} value={value ?? ''} />}

        <AnimatePresence>
          {open && (
            <motion.ul
              id={listId}
              role="listbox"
              aria-labelledby={label ? labelId : undefined}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
              className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-64 origin-top overflow-auto rounded-lv-md border border-lv-border bg-lv-surface p-1 shadow-lv-lg"
            >
              {options.map((option, index) => {
                const isSelected = option.value === value
                const isActive = index === activeIndex
                const Icon = option.icon
                return (
                  <li
                    key={option.value}
                    id={`${baseId}-opt-${index}`}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled || undefined}
                    onPointerMove={() => !option.disabled && setActiveIndex(index)}
                    onClick={() => choose(index)}
                    className={cn(
                      'flex cursor-default items-center gap-2.5 rounded-lv-sm px-2.5 py-1.5 text-body text-lv-text',
                      isActive && !option.disabled && 'bg-lv-hover',
                      option.disabled && 'cursor-not-allowed opacity-50'
                    )}
                  >
                    {Icon && <Icon aria-hidden size={16} strokeWidth={1.85} className="shrink-0 text-lv-text-muted" />}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate">{option.label}</span>
                      {option.description && (
                        <span className="block truncate text-caption text-lv-text-muted">
                          {option.description}
                        </span>
                      )}
                    </span>
                    <Check
                      aria-hidden
                      size={16}
                      strokeWidth={2}
                      className={cn('shrink-0 text-lv-accent', isSelected ? 'opacity-100' : 'opacity-0')}
                    />
                  </li>
                )
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </Field>
  )
}

function firstEnabled(options: SelectOption[]) {
  return options.findIndex((o) => !o.disabled)
}

function step(options: SelectOption[], from: number, dir: 1 | -1) {
  let i = from
  for (let n = 0; n < options.length; n++) {
    i += dir
    if (i < 0 || i >= options.length) return from
    if (!options[i].disabled) return i
  }
  return from
}
