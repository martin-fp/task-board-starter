'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import type { Status, Task } from '@/lib/types'
import { ALL_STATUSES } from '@/lib/types'
import { statusLabel } from '@/lib/utils'

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
      <CardContent className="flex gap-8 py-5">
        {ALL_STATUSES.map((status) => (
          <div key={status} className="flex flex-col">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              {statusLabel(status)}
            </span>
            <span
              className="text-2xl font-semibold tabular-nums"
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
