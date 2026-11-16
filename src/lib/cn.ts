import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * Custom tailwind-merge configuration for LocalVault.
 * Registers custom typography classes (`text-display`, `text-h1`, `text-h2`, `text-h3`,
 * `text-body`, `text-small`, `text-caption`) under the 'font-size' class group rather
 * than letting them default to 'text-color', and registers LocalVault semantic colors under 'text-color'.
 *
 * This prevents tailwind-merge from stripping font size classes when paired with text color classes.
 */
export const lvTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-display',
        'text-h1',
        'text-h2',
        'text-h3',
        'text-body',
        'text-small',
        'text-caption',
      ],
      'text-color': [
        'text-lv-bg',
        'text-lv-surface',
        'text-lv-surface-muted',
        'text-lv-surface-inset',
        'text-lv-surface-sunken',
        'text-lv-text',
        'text-lv-text-muted',
        'text-lv-text-subtle',
        'text-lv-accent',
        'text-lv-accent-hover',
        'text-lv-accent-active',
        'text-lv-accent-fg',
        'text-lv-on-accent',
        'text-lv-border',
        'text-lv-border-strong',
        'text-lv-hover',
        'text-lv-active',
        'text-lv-press',
        'text-lv-selected',
        'text-lv-focus',
        'text-lv-neutral',
        'text-lv-neutral-hover',
        'text-lv-backdrop',
        'text-lv-elevated',
        'text-lv-inverse',
        'text-lv-inverse-text',
        'text-lv-success',
        'text-lv-success-fg',
        'text-lv-warning',
        'text-lv-warning-fg',
        'text-lv-danger',
        'text-lv-danger-fg',
        'text-lv-info',
        'text-lv-info-fg',
      ],
    },
  },
})

/**
 * Combines classes using clsx and LocalVault-aware tailwind-merge.
 */
export function cn(...inputs: ClassValue[]): string {
  return lvTwMerge(clsx(inputs))
}
