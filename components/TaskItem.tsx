'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ALL_STATUSES, type Priority, type Status, type Task } from '@/lib/types'
import { statusLabel } from '@/lib/utils'

const priorityVariant: Record<Priority, 'default' | 'secondary' | 'outline'> = {
  high: 'default',
  medium: 'secondary',
  low: 'outline',
}

interface TaskItemProps {
  task: Task
  onStatusChange: (id: string, status: Status) => void
}

export function TaskItem({ task, onStatusChange }: TaskItemProps) {
  return (
    <li>
      <Card>
        <CardContent className="flex items-center gap-4 py-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="truncate font-medium">{task.title}</span>
              <Badge variant={priorityVariant[task.priority]}>
                {task.priority}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{task.assignee}</p>
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
