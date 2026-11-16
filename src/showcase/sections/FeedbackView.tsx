import React, { useState } from 'react'
import {
  CircularProgress,
  DeviceConnectionSummary,
  DeviceStatusIndicator,
  EmptyState,
  InlineAlert,
  LinearProgress,
  SkeletonLoader,
  Spinner,
  StatusBadge,
  TransferProgressSummary,
} from '../../index'
import { Button } from '../../components/ui/Button'
import { ArrowUpRight, FolderX, Pause, Play, RefreshCw, X } from 'lucide-react'

export function FeedbackView() {
  const [progressVal, setProgressVal] = useState(68)
  const [transferPaused, setTransferPaused] = useState(false)
  const [alertOpen, setAlertOpen] = useState(true)

  return (
    <div className="flex flex-col gap-10">
      {/* Transfer Progress Tile (Core Domain) */}
      <div>
        <h3 className="text-h2 font-semibold text-lv-text">Transfer Progress Summary</h3>
        <p className="mt-1 text-small text-lv-text-muted">Real-time chunked transfer tile mapped 1:1 to Gateway state machine.</p>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <TransferProgressSummary
            fileName="localvault-windows-phase-e-final.zip"
            source="MacBook Pro"
            destination="Asus Gaming PC"
            transferredBytes={transferPaused ? 18454937 : 33554432}
            totalBytes={48234496}
            status={transferPaused ? 'paused' : 'transferring'}
            speed={24576000}
            actions={
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  icon={transferPaused ? Play : Pause}
                  onClick={() => setTransferPaused(!transferPaused)}
                  aria-label={transferPaused ? 'Resume transfer' : 'Pause transfer'}
                />
                <Button size="sm" variant="ghost" icon={X} aria-label="Cancel transfer" />
              </div>
            }
          />

          <TransferProgressSummary
            fileName="MacBook-System-Backup.tar.gz"
            source="MacBook Pro"
            destination="Storage Server"
            transferredBytes={1073741824}
            totalBytes={1073741824}
            status="completed"
          />
        </div>
      </div>

      {/* Status Badges & Hardware Indicators */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-h3 font-semibold text-lv-text">Status Badges</h3>
          <p className="mt-1 text-caption text-lv-text-muted">Semantic tone badges with live pulse indicators.</p>

          <div className="mt-4 flex flex-wrap items-center gap-2 rounded-lv-lg border border-lv-border bg-lv-surface p-4">
            <StatusBadge tone="success" dot>Verified</StatusBadge>
            <StatusBadge tone="progress" dot live>Transferring</StatusBadge>
            <StatusBadge tone="warning" dot>Paused</StatusBadge>
            <StatusBadge tone="error" dot>Failed</StatusBadge>
            <StatusBadge tone="info" dot>Analyzing</StatusBadge>
            <StatusBadge tone="neutral">Queued</StatusBadge>
          </div>
        </div>

        <div>
          <h3 className="text-h3 font-semibold text-lv-text">Device Connection Indicators</h3>
          <p className="mt-1 text-caption text-lv-text-muted">Connection state dots and labels.</p>

          <div className="mt-4 flex flex-wrap items-center gap-4 rounded-lv-lg border border-lv-border bg-lv-surface p-4">
            <DeviceStatusIndicator status="online" />
            <DeviceStatusIndicator status="offline" />
            <DeviceStatusIndicator status="connecting" />
            <DeviceStatusIndicator status="error" />
          </div>
        </div>
      </div>

      {/* Device Connection Summary */}
      <div>
        <h3 className="text-h3 font-semibold text-lv-text">Device Connection Summaries</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DeviceConnectionSummary
            name="MacBook Pro 14″"
            kind="mac"
            status="online"
            detail="127.0.0.1:3001 · Localhost Agent"
            action={<Button size="sm" variant="outline">Inspect</Button>}
          />
          <DeviceConnectionSummary
            name="Windows PC"
            kind="windows"
            status="offline"
            lastSeen="Last pinged 14 minutes ago"
            detail="192.168.29.49:3001"
            action={<Button size="sm" variant="outline">Reconnect</Button>}
          />
        </div>
      </div>

      {/* Progress Bars & Spinners */}
      <div>
        <h3 className="text-h2 font-semibold text-lv-text">Progress & Spinners</h3>
        <div className="mt-4 flex flex-col gap-6 rounded-lv-lg border border-lv-border bg-lv-surface p-6">
          <div className="flex flex-col gap-2">
            <span className="text-caption font-medium text-lv-text-muted">Linear Progress (Determinate & Indeterminate)</span>
            <LinearProgress value={progressVal} showValue tone="accent" />
            <LinearProgress value={85} showValue tone="success" />
            <LinearProgress indeterminate tone="accent" />
          </div>

          <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-3">
              <span className="text-caption font-medium text-lv-text-muted">Circular:</span>
              <CircularProgress size="compact" value={progressVal} />
              <CircularProgress size="large" value={progressVal} />
              <CircularProgress size="compact" indeterminate />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-caption font-medium text-lv-text-muted">Spinners:</span>
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Alerts & Empty States */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-h3 font-semibold text-lv-text">Inline Alerts</h3>
          <div className="mt-4 flex flex-col gap-3">
            {alertOpen && (
              <InlineAlert
                tone="warning"
                title="Mutual TLS Certificate Expiring"
                onDismiss={() => setAlertOpen(false)}
                action={<Button size="sm" variant="outline">Regenerate Cert</Button>}
              >
                The self-signed peer certificate for Windows node expires in 4 days.
              </InlineAlert>
            )}
            <InlineAlert
              tone="success"
              title="Integrity Verified"
            >
              All 14 chunks validated successfully with matching SHA-256 signatures.
            </InlineAlert>
            <InlineAlert
              tone="error"
              title="Destination Full"
            >
              Remote disk does not have sufficient space to allocate staging partition.
            </InlineAlert>
          </div>
        </div>

        <div>
          <h3 className="text-h3 font-semibold text-lv-text">Empty State & Skeletons</h3>
          <div className="mt-4 rounded-lv-lg border border-lv-border bg-lv-surface p-4">
            <EmptyState
              icon={FolderX}
              title="No Files Found"
              description="This folder is empty. Upload or drop files here to begin transfer."
              action={<Button variant="primary">Upload to Device</Button>}
              size="compact"
            />
          </div>
        </div>
      </div>

      {/* Skeletons */}
      <div>
        <h3 className="text-h3 font-semibold text-lv-text">Skeleton Loading States</h3>
        <div className="mt-4 rounded-lv-lg border border-lv-border bg-lv-surface p-6">
          <SkeletonLoader variant="file-rows" count={3} />
        </div>
      </div>
    </div>
  )
}
