'use client'

import type { Status, Task } from '@/lib/types'
import { TaskItem } from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  onStatusChange: (id: string, status: Status) => void
}

export function TaskList({ tasks, onStatusChange }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-md border border-dashed py-12 text-center text-sm text-muted-foreground">
        No tasks match the current filter.
      </div>
    )
  }
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onStatusChange={onStatusChange} />
      ))}
    </ul>
  )
}
