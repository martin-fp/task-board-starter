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

export const STATUS_COLORS: Record<
  Status,
  { border: string; text: string; bg: string }
> = {
  todo: {
    border: 'border-l-slate-300',
    text: 'text-slate-700',
    bg: 'bg-slate-100',
  },
  'in-progress': {
    border: 'border-l-amber-500',
    text: 'text-amber-700',
    bg: 'bg-amber-50',
  },
  done: {
    border: 'border-l-emerald-500',
    text: 'text-emerald-700',
    bg: 'bg-emerald-50',
  },
}

export const PRIORITY_COLORS: Record<Priority, string> = {
  high: 'bg-red-500',
  medium: 'bg-amber-500',
  low: 'bg-slate-300',
}
