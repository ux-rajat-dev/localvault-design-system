import React from 'react'
import {
  File,
  FileArchive,
  FileAudio,
  FileCode,
  FileImage,
  FileSpreadsheet,
  FileText,
  FileVideo,
  Folder,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '../../lib/cn'

export type FileKind =
  | 'folder'
  | 'document'
  | 'spreadsheet'
  | 'image'
  | 'video'
  | 'audio'
  | 'archive'
  | 'code'
  | 'other'

export interface FileRowProps {
  name: string
  kind: FileKind
  /** Pre-formatted, e.g. "2.4 MB". Folders typically pass "—". */
  size?: string
  /** Pre-formatted, e.g. "Today, 09:41". */
  modified: string
  selected?: boolean
  /** `additive` is true when ⌘ or Ctrl was held. */
  onSelect?: (additive: boolean) => void
  /** Double-click, or Enter on a selected row. */
  onOpen?: () => void
}

export function FileRow({ name, kind, size, modified, selected, onSelect, onOpen }: FileRowProps) {
  const Icon = KIND_ICON[kind]
  const interactive = Boolean(onSelect || onOpen)

  return (
    <div
      role={interactive ? 'option' : undefined}
      aria-selected={interactive ? Boolean(selected) : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={(e) => onSelect?.(e.metaKey || e.ctrlKey)}
      onDoubleClick={() => onOpen?.()}
      onKeyDown={(e) => {
        if (e.key === ' ') {
          e.preventDefault()
          onSelect?.(e.metaKey || e.ctrlKey)
        } else if (e.key === 'Enter') {
          e.preventDefault()
          if (selected && onOpen) onOpen()
          else onSelect?.(false)
        }
      }}
      className={cn(
        ROW_GRID,
        'h-9 rounded-lv-sm text-small outline-none',
        interactive &&
          'cursor-default transition-colors duration-100 ease-out focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lv-accent/45',
        selected
          ? 'bg-lv-accent/[0.14] text-lv-text'
          : interactive
            ? 'text-lv-text hover:bg-lv-text/[0.04]'
            : 'text-lv-text'
      )}
    >
      <span className="flex min-w-0 items-center gap-2.5">
        <Icon
          size={16}
          strokeWidth={1.75}
          className={cn('shrink-0', kind === 'folder' || selected ? 'text-lv-accent' : 'text-lv-text-muted')}
        />
        <span className="truncate" title={name}>
          {name}
        </span>
      </span>
      <span className="text-right text-lv-text-muted tabular-nums">{size ?? '—'}</span>
      <span className="hidden truncate text-lv-text-muted tabular-nums sm:block">{modified}</span>
    </div>
  )
}

/** Column labels that share the row grid, so headers and cells align. */
export function FileListHeader({
  labels = ['Name', 'Size', 'Modified'],
}: {
  labels?: [string, string, string]
}) {
  return (
    <div
      role="presentation"
      className={cn(ROW_GRID, 'h-7 border-b border-lv-border text-caption font-medium text-lv-text-muted')}
    >
      <span>{labels[0]}</span>
      <span className="text-right">{labels[1]}</span>
      <span className="hidden sm:block">{labels[2]}</span>
    </div>
  )
}

const ROW_GRID =
  'grid grid-cols-[minmax(0,1fr)_72px] items-center gap-4 px-3 sm:grid-cols-[minmax(0,1fr)_80px_150px]'

const KIND_ICON: Record<FileKind, LucideIcon> = {
  folder: Folder,
  document: FileText,
  spreadsheet: FileSpreadsheet,
  image: FileImage,
  video: FileVideo,
  audio: FileAudio,
  archive: FileArchive,
  code: FileCode,
  other: File,
}
