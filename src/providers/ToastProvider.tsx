import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Toast, type ToastVariant } from '../components/overlays/Toast'
import { overlayEase } from '../hooks/useDismiss'

export interface ToastOptions {
  variant?: ToastVariant
  title: string
  description?: string
  /** ms before auto-dismiss. Defaults to the provider's duration. */
  duration?: number
}

interface ToastRecord extends Required<Omit<ToastOptions, 'description'>> {
  id: number
  description?: string
}

export interface ToastContextValue {
  toast: (options: ToastOptions) => number
  dismiss: (id: number) => void
  dismissAll: () => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export interface ToastProviderProps {
  children: React.ReactNode
  /** Oldest toasts are removed once more than this many are showing. */
  maxVisible?: number
  duration?: number
}

export function ToastProvider({ children, maxVisible = 3, duration = 5000 }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastRecord[]>([])
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const nextId = useRef(1)
  const reduceMotion = useReducedMotion()

  const dismiss = useCallback((id: number) => setToasts((list) => list.filter((t) => t.id !== id)), [])
  const dismissAll = useCallback(() => setToasts([]), [])

  const toast = useCallback(
    ({ variant = 'info', title, description, duration: d }: ToastOptions) => {
      const id = nextId.current++
      setToasts((list) => [...list, { id, variant, title, description, duration: d ?? duration }].slice(-maxVisible))
      return id
    },
    [duration, maxVisible]
  )

  const value = useMemo(() => ({ toast, dismiss, dismissAll }), [toast, dismiss, dismissAll])
  const paused = hovered || focused

  return (
    <ToastContext.Provider value={value}>
      {children}
      <section
        aria-label="Notifications"
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false)
        }}
        className="pointer-events-none fixed bottom-4 right-4 left-4 z-[70] flex flex-col items-stretch gap-2 sm:left-auto sm:w-[360px]"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout={!reduceMotion}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 24, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1, transition: { duration: 0.22, ease: overlayEase } }}
              exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.96, transition: { duration: 0.16, ease: overlayEase } }}
              transition={{ layout: { duration: 0.2, ease: overlayEase } }}
            >
              <Toast
                variant={t.variant}
                title={t.title}
                description={t.description}
                duration={t.duration}
                paused={paused}
                onDismiss={() => dismiss(t.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </section>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}
