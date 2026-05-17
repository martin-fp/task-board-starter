'use client'

import { useMemo, useState } from 'react'
import type { Status, Task } from '@/lib/types'
import {
  applyStatusFilter,
  sortByPriority,
  type StatusFilterValue,
} from '@/lib/utils'
import { CreateTaskForm } from './CreateTaskForm'
import { StatusFilter } from './StatusFilter'
import { SummaryHeader } from './SummaryHeader'
import { TaskList } from './TaskList'

interface TaskBoardProps {
  initialTasks: Task[]
}

export function TaskBoard({ initialTasks }: TaskBoardProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [filter, setFilter] = useState<StatusFilterValue>('all')

  const visibleTasks = useMemo(
    () => sortByPriority(applyStatusFilter(tasks, filter)),
    [tasks, filter],
  )

  function handleAdd(task: Omit<Task, 'id'>) {
    setTasks((prev) => [...prev, { ...task, id: `t-${Date.now()}` }])
  }

  function handleStatusChange(id: string, status: Status) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t)),
    )
  }

  return (
    <div className="space-y-6">
      <SummaryHeader tasks={tasks} />
      <CreateTaskForm onAdd={handleAdd} />
      <div className="flex items-center justify-between gap-4">
        <StatusFilter value={filter} onChange={setFilter} />
        <p className="text-sm text-muted-foreground">
          Showing {visibleTasks.length} of {tasks.length}
        </p>
      </div>
      <TaskList tasks={visibleTasks} onStatusChange={handleStatusChange} />
    </div>
  )
}
