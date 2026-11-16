import React, { useRef } from 'react'
import { AlertTriangle, HelpCircle } from 'lucide-react'
import { Dialog } from './Dialog'
import { Button } from '../ui/Button'

export type ConfirmTone = 'default' | 'destructive'

export interface ConfirmDialogProps {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
  title: React.ReactNode
  description?: React.ReactNode
  tone?: ConfirmTone
  confirmLabel?: string
  cancelLabel?: string
  /** Label while loading, e.g. "Moving…". */
  loadingLabel?: string
  /** Shows a spinner, disables both actions, and blocks closing. */
  loading?: boolean
  /** Disables only the confirm action. */
  confirmDisabled?: boolean
  /** Show the tone icon beside the title. */
  showIcon?: boolean
  /** Replace the tone icon. */
  icon?: React.ReactNode
  /** Extra content between the description and the actions. */
  children?: React.ReactNode
}

/** A Dialog preset for a single yes/no decision. */
export function ConfirmDialog({
  open,
  onCancel,
  onConfirm,
  title,
  description,
  tone = 'default',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  loadingLabel,
  loading = false,
  confirmDisabled = false,
  showIcon = true,
  icon,
  children,
}: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null)
  const confirmRef = useRef<HTMLButtonElement>(null)
  const destructive = tone === 'destructive'

  const toneIcon = icon ?? (
    <span
      className={`inline-flex size-9 items-center justify-center rounded-full ${
        destructive ? 'bg-lv-danger/15 text-lv-danger' : 'bg-lv-accent/15 text-lv-accent'
      }`}
    >
      {destructive ? <AlertTriangle size={20} aria-hidden /> : <HelpCircle size={20} aria-hidden />}
    </span>
  )

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      size="sm"
      title={title}
      description={description}
      icon={showIcon ? toneIcon : undefined}
      dismissible={!loading}
      // Destructive: the safe choice gets focus. Default: confirm does.
      initialFocusRef={destructive || confirmDisabled ? cancelRef : confirmRef}
      footer={
        <>
          <Button ref={cancelRef} variant="secondary" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            ref={confirmRef}
            variant={destructive ? 'destructive' : 'primary'}
            onClick={onConfirm}
            loading={loading}
            disabled={confirmDisabled}
          >
            {loading && loadingLabel ? loadingLabel : confirmLabel}
          </Button>
        </>
      }
    >
      {children}
    </Dialog>
  )
}
