'use client'

import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ALL_STATUSES, type Status, type Task } from '@/lib/types'
import { PRIORITY_COLORS, STATUS_COLORS, cn, statusLabel } from '@/lib/utils'

interface TaskItemProps {
  task: Task
  onStatusChange: (id: string, status: Status) => void
}

export function TaskItem({ task, onStatusChange }: TaskItemProps) {
  return (
    <li>
      <Card
        className={cn(
          'border-l-4 transition-shadow hover:shadow-md',
          STATUS_COLORS[task.status].border,
        )}
      >
        <CardContent className="flex items-center gap-4 py-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'h-2 w-2 shrink-0 rounded-full',
                  PRIORITY_COLORS[task.priority],
                )}
                aria-label={`${task.priority} priority`}
              />
              <span className="truncate font-medium">{task.title}</span>
              <span
                aria-hidden="true"
                className="text-xs text-muted-foreground/60"
              >
                ·
              </span>
              <span className="text-xs text-muted-foreground">
                {task.priority}
              </span>
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {task.assignee}
            </p>
          </div>
          <Select
            value={task.status}
            onValueChange={(v) => onStatusChange(task.id, v as Status)}
          >
            <SelectTrigger
              className="w-[140px]"
              aria-label={`Status for ${task.title}`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ALL_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {statusLabel(s)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </li>
  )
}
