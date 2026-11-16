import React, { useState } from 'react'
import {
  Button,
  DropdownMenu,
  Popover,
  Tooltip,
  useToast,
  type DropdownMenuEntry,
} from '../../index'
import {
  Bell,
  CheckCircle2,
  Copy,
  Download,
  Filter,
  HardDrive,
  Info,
  MoreVertical,
  Plus,
  Settings,
  Share2,
  Trash2,
} from 'lucide-react'

export function OverlaysView() {
  const { toast } = useToast()
  const [filterMode, setFilterMode] = useState('all')

  const menuEntries: DropdownMenuEntry[] = [
    { type: 'label', id: 'filter-label', label: 'FILTER BY TYPE' },
    {
      id: 'all',
      label: 'All Files',
      checked: filterMode === 'all',
    },
    {
      id: 'docs',
      label: 'Documents (.pdf, .docx)',
      checked: filterMode === 'docs',
    },
    {
      id: 'media',
      label: 'Photos & Videos',
      checked: filterMode === 'media',
    },
    { type: 'divider', id: 'div1' },
    { type: 'label', id: 'actions-label', label: 'ACTIONS' },
    { id: 'download-all', label: 'Download All Zipped', icon: <Download size={14} />, shortcut: '⌘⇧D' },
    { id: 'share', label: 'Peer Transfer Selection', icon: <Share2 size={14} /> },
    { type: 'divider', id: 'div2' },
    { id: 'clear-trash', label: 'Empty Trash Volume', icon: <Trash2 size={14} />, destructive: true },
  ]

  return (
    <div className="flex flex-col gap-10">
      {/* Toast Notifications */}
      <div>
        <h3 className="text-h2 font-semibold text-lv-text">Toast Notifications</h3>
        <p className="mt-1 text-small text-lv-text-muted">
          Pausable auto-dismiss toasts managed by <code>ToastProvider</code> and <code>useToast()</code> hook.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lv-lg border border-lv-border bg-lv-surface p-6">
          <Button
            variant="primary"
            onClick={() =>
              toast({
                title: 'Transfer Verified',
                description: 'localvault-mac-test-01.txt checksum match confirmed.',
                variant: 'success',
              })
            }
          >
            Trigger Success Toast
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              toast({
                title: 'Peer Ping Warning',
                description: 'Windows PC latency exceeded 120ms.',
                variant: 'warning',
              })
            }
          >
            Trigger Warning Toast
          </Button>

          <Button
            variant="destructive"
            onClick={() =>
              toast({
                title: 'Transfer Failed',
                description: 'Socket disconnected prematurely during chunk 8.',
                variant: 'error',
              })
            }
          >
            Trigger Error Toast
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              toast({
                title: 'Discovery Scanning',
                description: 'Searching for local agents on subnet 192.168.29.0/24.',
                variant: 'info',
              })
            }
          >
            Trigger Info Toast
          </Button>
        </div>
      </div>

      {/* Dropdown Menus */}
      <div>
        <h3 className="text-h2 font-semibold text-lv-text">Dropdown Menus</h3>
        <p className="mt-1 text-small text-lv-text-muted">
          Keyboard navigable list with radio items, shortcut badges, and dividers.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-6 rounded-lv-lg border border-lv-border bg-lv-surface p-6">
          <DropdownMenu
            trigger="Options & Filters"
            triggerVariant="button"
            items={menuEntries}
            onSelect={(id) => {
              if (['all', 'docs', 'media'].includes(id)) setFilterMode(id)
              toast({ title: `Action "${id}" selected`, variant: 'info' })
            }}
          />

          <DropdownMenu
            trigger={<MoreVertical size={16} />}
            triggerVariant="icon"
            triggerAriaLabel="More Actions"
            items={menuEntries}
            onSelect={(id) => toast({ title: `Action "${id}" selected`, variant: 'info' })}
          />
        </div>
      </div>

      {/* Popovers & Tooltips */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-h3 font-semibold text-lv-text">Popovers</h3>
          <p className="mt-1 text-caption text-lv-text-muted">
            Anchored floating cards with header, close control, and arbitrary interactive content.
          </p>

          <div className="mt-4 flex items-center gap-4 rounded-lv-lg border border-lv-border bg-lv-surface p-6">
            <Popover
              title="Storage Volume Details"
              trigger={<Button variant="outline" leadingIcon={HardDrive}>View Volume Details</Button>}
              width={320}
            >
              {({ close }) => (
                <div className="flex flex-col gap-3 p-3.5">
                  <div className="flex justify-between text-caption">
                    <span className="text-lv-text-muted">Filesystem:</span>
                    <span className="font-semibold text-lv-text">APFS (Encrypted)</span>
                  </div>
                  <div className="flex justify-between text-caption">
                    <span className="text-lv-text-muted">Mount Point:</span>
                    <span className="font-mono text-lv-text">~/LocalVault-Storage</span>
                  </div>
                  <div className="flex justify-between text-caption">
                    <span className="text-lv-text-muted">Available:</span>
                    <span className="font-semibold text-lv-success">588 GB Free</span>
                  </div>
                  <Button size="sm" variant="primary" fullWidth onClick={close}>
                    Close Panel
                  </Button>
                </div>
              )}
            </Popover>
          </div>
        </div>

        <div>
          <h3 className="text-h3 font-semibold text-lv-text">Tooltips</h3>
          <p className="mt-1 text-caption text-lv-text-muted">
            Hover and focus tooltips with keyboard shortcuts and adjacent toolbar warming.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lv-lg border border-lv-border bg-lv-surface p-6">
            <Tooltip content="Upload new file to storage" shortcut="⌘U">
              <Button variant="outline" icon={Plus} aria-label="Upload file" />
            </Tooltip>

            <Tooltip content="Download selected archive" shortcut="⌘D">
              <Button variant="outline" icon={Download} aria-label="Download archive" />
            </Tooltip>

            <Tooltip content="Synchronize with Windows node" shortcut="⌘R">
              <Button variant="outline" icon={Share2} aria-label="Sync devices" />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  )
}
