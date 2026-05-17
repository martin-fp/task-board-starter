import type { Task } from './types'

export const seedTasks: Task[] = [
  {
    id: 't-1',
    title: 'Set up CI pipeline',
    status: 'done',
    priority: 'high',
    assignee: 'Alex',
  },
  {
    id: 't-2',
    title: 'Draft onboarding doc',
    status: 'in-progress',
    priority: 'medium',
    assignee: 'Priya',
  },
  {
    id: 't-3',
    title: 'Audit analytics events',
    status: 'todo',
    priority: 'low',
    assignee: 'Sam',
  },
  {
    id: 't-4',
    title: 'Fix flaky auth test',
    status: 'todo',
    priority: 'high',
    assignee: 'Jordan',
  },
  {
    id: 't-5',
    title: 'Refactor billing client',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Alex',
  },
  {
    id: 't-6',
    title: 'Update Q2 roadmap',
    status: 'done',
    priority: 'medium',
    assignee: 'Priya',
  },
]
