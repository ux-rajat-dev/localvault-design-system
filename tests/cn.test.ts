import { describe, it, expect } from 'vitest'
import { cn } from '../src/lib/cn'
import { twMerge } from 'tailwind-merge'

describe('LocalVault ClassName Merger (cn)', () => {
  it('demonstrates standard twMerge defect where custom font classes are dropped', () => {
    // Unconfigured twMerge treats text-body and text-lv-text as the same property group and drops one!
    const broken = twMerge('text-body text-lv-text')
    expect(broken).toBe('text-lv-text') // Notice text-body was dropped by default twMerge!
  })

  it('correctly preserves both custom font-size and custom text color', () => {
    const merged = cn('text-body', 'text-lv-text')
    expect(merged).toContain('text-body')
    expect(merged).toContain('text-lv-text')
  })

  it('correctly overrides font sizes when a later font size is passed', () => {
    const merged = cn('text-body', 'text-small')
    expect(merged).toBe('text-small')
  })

  it('correctly overrides text colors when a later text color is passed', () => {
    const merged = cn('text-lv-text', 'text-lv-accent')
    expect(merged).toBe('text-lv-accent')
  })

  it('correctly resolves padding and margin conflicts', () => {
    const merged = cn('p-4 px-2', 'p-6')
    expect(merged).toBe('p-6')
  })

  it('handles falsy values, arrays and conditional objects correctly', () => {
    const isActive = true
    const isError = false
    const merged = cn(
      'rounded-lv-md',
      undefined,
      null,
      false,
      isActive && 'border-lv-accent',
      isError && 'border-lv-danger',
      ['p-4', { 'opacity-50': false }]
    )
    expect(merged).toBe('rounded-lv-md border-lv-accent p-4')
  })
})
