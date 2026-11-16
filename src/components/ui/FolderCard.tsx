import React from 'react'
import { Folder } from 'lucide-react'
import { cn } from '../../lib/cn'
import { InteractiveCard } from './InteractiveCard'

export interface FolderCardProps {
  name: string
  /** Optional — omit when the count is unknown or not useful. */
  itemCount?: number
  selected?: boolean
  disabled?: boolean
  onSelect?: () => void
  /** Double-click or Enter on a selected card. */
  onOpen?: () => void
}

export function FolderCard({
  name,
  itemCount,
  selected,
  disabled,
  onSelect,
  onOpen,
}: FolderCardProps) {
  return (
    <InteractiveCard
      role="option"
      padding="compact"
      selected={selected}
      disabled={disabled}
      onSelect={onSelect}
      onOpen={onOpen}
      aria-label={itemCount != null ? `${name}, ${itemCount} items` : name}
      className="flex flex-col gap-3"
    >
      <Folder
        size={28}
        strokeWidth={1.5}
        className={cn(
          'text-lv-accent transition-[fill] duration-150 ease-out',
          selected ? 'fill-lv-accent/25' : 'fill-lv-accent/10'
        )}
      />
      <div className="min-w-0">
        <p className="truncate text-small font-medium" title={name}>
          {name}
        </p>
        <p className="text-caption text-lv-text-muted tabular-nums">
          {itemCount != null ? `${itemCount.toLocaleString('en-US')} items` : '\u00a0'}
        </p>
      </div>
    </InteractiveCard>
  )
}
