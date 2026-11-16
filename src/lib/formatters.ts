/**
 * LocalVault Data & Speed Formatters
 * Extracted and standardized from Part 04
 */

export function formatBytes(bytes: number, decimals = 1): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const idx = Math.min(i, sizes.length - 1)
  const val = bytes / Math.pow(k, idx)
  return `${parseFloat(val.toFixed(decimals))} ${sizes[idx]}`
}

export function formatSpeed(bytesPerSec: number): string {
  if (!Number.isFinite(bytesPerSec) || bytesPerSec <= 0) return '0 B/s'
  return `${formatBytes(bytesPerSec)}/s`
}

export function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0s'
  const s = Math.round(seconds)
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  const remSec = s % 60
  if (m < 60) return remSec > 0 ? `${m}m ${remSec}s` : `${m}m`
  const h = Math.floor(m / 60)
  const remMin = m % 60
  return remMin > 0 ? `${h}h ${remMin}m` : `${h}h`
}

export function clampPercent(value: number): number {
  if (!Number.isFinite(value)) return 0
  return Math.min(100, Math.max(0, Math.round(value)))
}
