'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import type { Status, Task } from '@/lib/types'
import { ALL_STATUSES } from '@/lib/types'
import { STATUS_COLORS, cn, statusLabel } from '@/lib/utils'

interface SummaryHeaderProps {
  tasks: Task[]
}

function countByStatus(tasks: Task[]): Record<Status, number> {
  return tasks.reduce<Record<Status, number>>(
    (acc, t) => {
      acc[t.status] = (acc[t.status] ?? 0) + 1
      return acc
    },
    { todo: 0, 'in-progress': 0, done: 0 },
  )
}

export function SummaryHeader({ tasks }: SummaryHeaderProps) {
  const [counts] = useState(() => countByStatus(tasks))

  return (
    <Card>
      <CardContent className="grid grid-cols-3 gap-6 py-5">
        {ALL_STATUSES.map((status) => (
          <div key={status} className="flex flex-col">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {statusLabel(status)}
            </span>
            <span
              className={cn(
                'mt-1 text-3xl font-semibold tabular-nums',
                STATUS_COLORS[status].text,
              )}
              data-testid={`count-${status}`}
            >
              {counts[status]}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
