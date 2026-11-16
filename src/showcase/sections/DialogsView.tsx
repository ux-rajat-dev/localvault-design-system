import React, { useState } from 'react'
import {
  Button,
  ConfirmDialog,
  ContextMenu,
  Dialog,
  Input,
  type ContextMenuEntry,
} from '../../index'
import { AlertCircle, Copy, Download, FileText, Info, Share2, Trash2 } from 'lucide-react'

export function DialogsView() {
  const [modalOpen, setModalOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [destructiveOpen, setDestructiveOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [lastAction, setLastAction] = useState<string | null>(null)

  const contextItems: ContextMenuEntry[] = [
    { id: 'open', label: 'Open File', icon: <FileText size={16} /> },
    { id: 'copy', label: 'Copy Intra-Device', icon: <Copy size={16} />, shortcut: '⌘C' },
    { id: 'download', label: 'Download Directly', icon: <Download size={16} />, shortcut: '⌘D' },
    { type: 'separator', id: 'sep1' },
    { id: 'share', label: 'Peer Transfer to Windows', icon: <Share2 size={16} /> },
    { type: 'separator', id: 'sep2' },
    { id: 'delete', label: 'Move to Trash', icon: <Trash2 size={16} />, destructive: true, shortcut: '⌘⌫' },
  ]

  const handleSimulateDelete = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setConfirmLoading(false)
      setDestructiveOpen(false)
      setLastAction('Moved file to Trash successfully.')
    }, 1200)
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h3 className="text-h2 font-semibold text-lv-text">Modal Dialogs</h3>
        <p className="mt-1 text-small text-lv-text-muted">
          Portaled modal dialogs with focus trapping, focus restoration on close, and Escape key dismissal.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lv-lg border border-lv-border bg-lv-surface p-6">
          <Button variant="primary" onClick={() => setModalOpen(true)}>
            Open Standard Dialog
          </Button>

          <Button variant="outline" onClick={() => setConfirmOpen(true)}>
            Confirm Action Dialog
          </Button>

          <Button variant="destructive" onClick={() => setDestructiveOpen(true)}>
            Destructive Decision Dialog
          </Button>
        </div>

        {lastAction && (
          <div className="mt-3 text-caption text-lv-accent">
            Last Action Result: {lastAction}
          </div>
        )}
      </div>

      {/* Context Menu Specimen */}
      <div>
        <h3 className="text-h2 font-semibold text-lv-text">Context Menus</h3>
        <p className="mt-1 text-small text-lv-text-muted">
          Right-click or press <kbd className="rounded border px-1">Shift+F10</kbd> on the target area to trigger viewport-aware context menu with roving tabIndex and keyboard navigation.
        </p>

        <div className="mt-4">
          <ContextMenu
            label="File Actions Context Menu"
            items={contextItems}
            onSelect={(id) => setLastAction(`Selected context action: "${id}"`)}
          >
            <div className="flex h-44 cursor-context-menu flex-col items-center justify-center rounded-lv-lg border-2 border-dashed border-lv-border bg-lv-surface-sunken p-6 text-center transition-colors hover:border-lv-accent/60">
              <FileText size={32} className="text-lv-accent" />
              <p className="mt-2 text-body font-semibold text-lv-text">Right Click or Press Shift+F10 Here</p>
              <p className="mt-1 text-caption text-lv-text-muted">
                Demonstrates roving focus, viewport collision detection, item shortcuts, and destructive styling.
              </p>
            </div>
          </ContextMenu>
        </div>
      </div>

      {/* Standard Dialog */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create New Folder in Storage"
        description="Folder will be created in /Shared/Documents and synced to Windows PC."
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setModalOpen(false)
                setLastAction('Created folder "Project-Vault"')
              }}
            >
              Create Folder
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4 py-2">
          <Input label="Folder Name" defaultValue="Project-Vault" autoFocus />
          <p className="text-caption text-lv-text-muted">
            Folder names must not contain special filesystem characters: &lt; &gt; : &quot; / \ | ? *
          </p>
        </div>
      </Dialog>

      {/* Confirm Decision Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false)
          setLastAction('Overrode remote folder structure.')
        }}
        title="Overwrite Existing File?"
        description="A file named 'report.pdf' already exists in Windows destination. Replacing it cannot be undone."
        confirmLabel="Overwrite File"
        cancelLabel="Keep Both"
      />

      {/* Destructive Confirm Dialog with Loading State */}
      <ConfirmDialog
        open={destructiveOpen}
        tone="destructive"
        onCancel={() => setDestructiveOpen(false)}
        onConfirm={handleSimulateDelete}
        loading={confirmLoading}
        loadingLabel="Moving to Trash..."
        title="Permanently Delete Items?"
        description="Are you sure you want to move 4 selected files to Trash on both MacBook and Windows PC?"
        confirmLabel="Move to Trash"
      />
    </div>
  )
}
