import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Status, Task, Priority } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type StatusFilterValue = Status | 'all'

export function applyStatusFilter(
  tasks: Task[],
  filter: StatusFilterValue,
): Task[] {
  if (filter === 'all') return tasks
  return tasks.filter((t) => t.status === filter)
}

const PRIORITY_WEIGHT: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
}

export function sortByPriority(tasks: Task[]): Task[] {
  return [...tasks].sort(
    (a, b) => PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority],
  )
}

export function statusLabel(status: Status): string {
  if (status === 'in-progress') return 'In Progress'
  if (status === 'done') return 'Done'
  return 'To Do'
}
