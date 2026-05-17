'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ALL_PRIORITIES, type Priority, type Task } from '@/lib/types'
import { type TaskSuggestion, streamCompletion } from '@/lib/ai'
import { cn } from '@/lib/utils'

interface CreateTaskFormProps {
  onAdd: (task: Omit<Task, 'id'>) => void
}

export function CreateTaskForm({ onAdd }: CreateTaskFormProps) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [assignee, setAssignee] = useState('')
  const [suggesting, setSuggesting] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!title.trim() || !assignee.trim()) return
    onAdd({
      title: title.trim(),
      assignee: assignee.trim(),
      priority,
      status: 'todo',
    })
    setTitle('')
    setAssignee('')
    setPriority('medium')
  }

  async function handleSuggest() {
    setSuggesting(true)
    let response = ''
    for await (const token of streamCompletion({ prompt: title })) {
      response += token
    }
    const parsed = JSON.parse(response) as TaskSuggestion
    setTitle(parsed.title)
    setPriority(parsed.priority)
    setAssignee(parsed.assignee)
    setSuggesting(false)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium">New task</h2>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleSuggest}
            className="h-auto p-1 text-xs font-normal text-muted-foreground hover:text-foreground"
          >
            <Sparkles
              className={cn('mr-1 h-3 w-3', suggesting && 'animate-pulse')}
            />
            {suggesting ? 'Thinking…' : 'Suggest with AI'}
          </Button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid gap-3 md:grid-cols-[1fr_160px_160px_auto]"
        >
          <div className="grid gap-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={priority}
              onValueChange={(v) => setPriority(v as Priority)}
            >
              <SelectTrigger id="priority">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ALL_PRIORITIES.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p[0].toUpperCase() + p.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="assignee">Assignee</Label>
            <Input
              id="assignee"
              placeholder="Name"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button type="submit" className="w-full md:w-auto">
              Add task
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
