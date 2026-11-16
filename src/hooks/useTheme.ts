import { useCallback, useEffect, useRef, useState } from 'react'

export type Theme = 'light' | 'dark'

export interface UseThemeOptions {
  initial?: Theme
  syncDocument?: boolean
  onChange?: (theme: Theme) => void
}

/**
 * Owns the active LocalVault theme.
 * Sets `data-theme` (canonical) and `data-lv-theme` (compatibility).
 * Briefly adds `data-theme-switching` during a toggle so colors smoothly cross-fade.
 */
export function useTheme(options: UseThemeOptions = {}) {
  const { initial = 'light', syncDocument = true, onChange } = options

  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && syncDocument) {
      const existing = document.documentElement.getAttribute('data-theme') as Theme
      if (existing === 'light' || existing === 'dark') return existing
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
      }
    }
    return initial
  })

  const [switching, setSwitching] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  const applyThemeToDom = useCallback((targetTheme: Theme, isSwitching = false) => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    root.setAttribute('data-theme', targetTheme)
    root.setAttribute('data-lv-theme', targetTheme)
    if (targetTheme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }

    if (isSwitching) {
      root.setAttribute('data-theme-switching', '')
    } else {
      root.removeAttribute('data-theme-switching')
    }
  }, [])

  useEffect(() => {
    if (syncDocument) {
      applyThemeToDom(theme, false)
    }
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [theme, syncDocument, applyThemeToDom])

  const setTheme = useCallback(
    (next: Theme) => {
      setSwitching(true)
      setThemeState(next)
      if (syncDocument) {
        applyThemeToDom(next, true)
      }
      onChange?.(next)

      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        setSwitching(false)
        if (syncDocument && typeof document !== 'undefined') {
          document.documentElement.removeAttribute('data-theme-switching')
        }
      }, 220)
    },
    [onChange, syncDocument, applyThemeToDom]
  )

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }, [theme, setTheme])

  const themeProps = {
    'data-theme': theme,
    'data-lv-theme': theme,
    ...(switching ? { 'data-theme-switching': '' } : {}),
  }

  return { theme, setTheme, toggleTheme, themeProps, switching }
}
