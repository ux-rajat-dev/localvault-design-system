export type FeedbackTone = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'progress'

export type DeviceConnectionStatus = 'online' | 'offline' | 'connecting' | 'error'

export type TransferStatus =
  | 'queued'
  | 'transferring'
  | 'verifying'
  | 'completed'
  | 'paused'
  | 'cancelled'
  | 'failed'

export type DeviceKind = 'mac' | 'windows'

export { formatBytes, formatSpeed, formatDuration, clampPercent } from '../../lib/formatters'
