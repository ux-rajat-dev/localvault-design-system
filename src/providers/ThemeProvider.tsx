import React, { createContext, useContext, ReactNode } from 'react'
import { useTheme, type Theme, type UseThemeOptions } from '../hooks/useTheme'

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  themeProps: {
    'data-theme': Theme
    'data-lv-theme': Theme
    'data-theme-switching'?: string
  }
  switching: boolean
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export interface ThemeProviderProps extends UseThemeOptions {
  children: ReactNode
  /** Alias for initial */
  defaultTheme?: Theme
}

export function ThemeProvider({
  children,
  initial = 'light',
  defaultTheme,
  syncDocument = true,
  onChange,
}: ThemeProviderProps) {
  const themeState = useTheme({ initial: defaultTheme ?? initial, syncDocument, onChange })

  return <ThemeContext.Provider value={themeState}>{children}</ThemeContext.Provider>
}

export function useThemeContext(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useThemeContext must be used within a ThemeProvider')
  }
  return ctx
}
