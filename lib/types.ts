export type Status = 'todo' | 'in-progress' | 'done'
export type Priority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  title: string
  status: Status
  priority: Priority
  assignee: string
}

export const ALL_STATUSES: Status[] = ['todo', 'in-progress', 'done']
export const ALL_PRIORITIES: Priority[] = ['low', 'medium', 'high']
