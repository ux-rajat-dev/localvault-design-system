import { RefObject, useEffect, useRef } from 'react'

export const overlayEase = [0.23, 1, 0.32, 1] as const

/**
 * Closes an overlay on Escape and on a pointer press outside every given element.
 */
export function useDismiss(
  open: boolean,
  refs: RefObject<HTMLElement | null>[],
  onDismiss: (reason: 'escape' | 'outside') => void
) {
  const callback = useRef(onDismiss)
  callback.current = onDismiss
  const refsRef = useRef(refs)
  refsRef.current = refs

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      const inside = refsRef.current.some((r) => r.current?.contains(target))
      if (!inside) callback.current('outside')
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        callback.current('escape')
      }
    }
    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])
}
