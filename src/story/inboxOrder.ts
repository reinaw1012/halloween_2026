import type { Thread } from './types'

function initialTimeOrder(time: string) {
  if (time === 'Now') return 1441
  const match = /^(\d{1,2}):(\d{2})$/.exec(time)
  if (!match) return ({ Yesterday: -1, Thursday: -2, Wednesday: -3, Tuesday: -4, Monday: -5 } as Record<string, number>)[time] ?? -6
  const hour = Number(match[1])
  const minute = Number(match[2])
  return (hour > 0 && hour < 12 ? hour + 12 : hour) * 60 + minute
}

export function sortInboxThreads(threads: Thread[], lastActivity: Record<string, number>) {
  return [...threads].sort((first, second) => {
    const firstActivity = lastActivity[first.id]
    const secondActivity = lastActivity[second.id]
    if (firstActivity !== undefined || secondActivity !== undefined) {
      if (firstActivity === undefined) return 1
      if (secondActivity === undefined) return -1
      return secondActivity - firstActivity
    }
    return initialTimeOrder(second.time) - initialTimeOrder(first.time)
  })
}
