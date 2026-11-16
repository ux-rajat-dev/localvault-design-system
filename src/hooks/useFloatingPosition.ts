import { RefObject, useLayoutEffect, useState } from 'react'

export type Side = 'top' | 'bottom' | 'left' | 'right'
export type Align = 'start' | 'center' | 'end'
export type Placement = Side | `${Side}-${'start' | 'end'}`

export interface FloatingPosition {
  x: number
  y: number
  side: Side
  /** CSS transform-origin pointing back at the anchor, for scale animations. */
  origin: string
}

export interface FloatingOptions {
  placement?: Placement
  /** Gap between anchor and floating element, in px. */
  offset?: number
  /** Minimum distance kept from the viewport edge, in px. */
  padding?: number
}

const OPPOSITE: Record<Side, Side> = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' }

/**
 * Viewport-aware positioning for `position: fixed` overlays.
 * Flips to the opposite side when the preferred side lacks room, then shifts
 * along the cross axis so the element never leaves the viewport.
 */
export function useFloatingPosition(
  open: boolean,
  anchorRef: RefObject<HTMLElement | null>,
  floatingRef: RefObject<HTMLElement | null>,
  { placement = 'bottom-start', offset = 6, padding = 8 }: FloatingOptions = {}
): FloatingPosition | null {
  const [position, setPosition] = useState<FloatingPosition | null>(null)

  useLayoutEffect(() => {
    if (!open) {
      setPosition(null)
      return
    }

    const update = () => {
      const anchor = anchorRef.current
      const floating = floatingRef.current
      if (!anchor || !floating) return
      const a = anchor.getBoundingClientRect()
      const fw = floating.offsetWidth
      const fh = floating.offsetHeight
      const vw = window.innerWidth
      const vh = window.innerHeight

      const [preferredSide, alignPart] = placement.split('-') as [Side, Align | undefined]
      const align: Align = alignPart ?? 'center'

      const space: Record<Side, number> = {
        top: a.top,
        bottom: vh - a.bottom,
        left: a.left,
        right: vw - a.right,
      }
      const vertical = preferredSide === 'top' || preferredSide === 'bottom'
      const needed = (vertical ? fh : fw) + offset + padding
      let side = preferredSide
      if (space[side] < needed && space[OPPOSITE[side]] > space[side]) side = OPPOSITE[side]

      let x: number
      let y: number
      if (side === 'top' || side === 'bottom') {
        y = side === 'bottom' ? a.bottom + offset : a.top - offset - fh
        x = align === 'start' ? a.left : align === 'end' ? a.right - fw : a.left + a.width / 2 - fw / 2
      } else {
        x = side === 'right' ? a.right + offset : a.left - offset - fw
        y = align === 'start' ? a.top : align === 'end' ? a.bottom - fh : a.top + a.height / 2 - fh / 2
      }

      x = clamp(x, padding, Math.max(padding, vw - fw - padding))
      y = clamp(y, padding, Math.max(padding, vh - fh - padding))

      const originX =
        side === 'left' ? 'right' : side === 'right' ? 'left' : align === 'start' ? 'left' : align === 'end' ? 'right' : 'center'
      const originY = side === 'top' ? 'bottom' : side === 'bottom' ? 'top' : 'center'

      setPosition({ x, y, side, origin: `${originX} ${originY}` })
    }

    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null
    if (observer && floatingRef.current) observer.observe(floatingRef.current)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
      observer?.disconnect()
    }
  }, [open, placement, offset, padding, anchorRef, floatingRef])

  return position
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
