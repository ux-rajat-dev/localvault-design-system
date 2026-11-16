import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { cn } from '../../lib/cn'
import { useThemeContext } from '../../providers/ThemeProvider'
import type { Theme } from '../../hooks/useTheme'

export interface ThemeToggleProps {
  value?: Theme
  onChange?: (theme: Theme) => void
  className?: string
}

/**
 * LocalVault Light/Dark segmented switch.
 * Can be used controlled via props, or self-contained inside a ThemeProvider.
 */
export function ThemeToggle({ value: propValue, onChange: propOnChange, className }: ThemeToggleProps) {
  let contextValue: Theme | undefined
  let contextOnChange: ((theme: Theme) => void) | undefined

  try {
    const ctx = useThemeContext()
    contextValue = ctx.theme
    contextOnChange = ctx.setTheme
  } catch {
    // Render in standalone mode without provider
  }

  const activeTheme = propValue ?? contextValue ?? 'light'
  const handleThemeChange = propOnChange ?? contextOnChange ?? (() => {})

  const options: Array<{ id: Theme; label: string; icon: typeof Sun }> = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
  ]

  return (
    <div
      role="radiogroup"
      aria-label="Theme switcher"
      className={cn(
        'inline-flex shrink-0 gap-0.5 rounded-lv-md bg-lv-text/[0.06] p-0.5',
        className
      )}
      onKeyDown={(e) => {
        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
          e.preventDefault()
          const next = activeTheme === 'light' ? 'dark' : 'light'
          handleThemeChange(next)
          ;(e.currentTarget.querySelector(`[data-id="${next}"]`) as HTMLElement | null)?.focus()
        }
      }}
    >
      {options.map(({ id, label, icon: Icon }) => {
        const active = activeTheme === id
        return (
          <button
            key={id}
            type="button"
            role="radio"
            data-id={id}
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => handleThemeChange(id)}
            className={cn(
              'inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-[8px] px-3 text-small font-medium outline-none',
              'transition-[background-color,color,box-shadow] duration-150 ease-out',
              'focus-visible:ring-2 focus-visible:ring-lv-accent/45',
              active
                ? 'bg-lv-surface text-lv-text shadow-lv-sm'
                : 'text-lv-text-muted hover:text-lv-text'
            )}
          >
            <Icon size={16} />
            {label}
          </button>
        )
      })}
    </div>
  )
}
