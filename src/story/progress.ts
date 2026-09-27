import type { RouteId } from './types'
export type { RouteId } from './types'
export type Progress = { aCompleted: boolean; bCompleted: boolean; jackCompleted: boolean; firstRead: 'a' | 'b' | null }
export const emptyProgress: Progress = { aCompleted: false, bCompleted: false, jackCompleted: false, firstRead: null }
const KEY = 'master-controller:progress:v1'
export function loadProgress(): Progress {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || 'null') as Partial<Progress> | null
    if (!raw || typeof raw.aCompleted !== 'boolean' || typeof raw.bCompleted !== 'boolean' || typeof raw.jackCompleted !== 'boolean' || ![null, 'a', 'b'].includes(raw.firstRead ?? null)) return emptyProgress
    return { aCompleted: raw.aCompleted, bCompleted: raw.bCompleted, jackCompleted: raw.jackCompleted, firstRead: raw.firstRead ?? null }
  } catch { return emptyProgress }
}
export function saveProgress(progress: Progress) { try { localStorage.setItem(KEY, JSON.stringify(progress)) } catch { /* private mode can disable storage */ } }
export function canOpen(id: RouteId, progress: Progress) { return id !== 'jack' || (progress.aCompleted && progress.bCompleted) }
