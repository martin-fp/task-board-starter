import { ListChecks } from 'lucide-react'
import { TaskBoard } from '@/components/TaskBoard'
import { seedTasks } from '@/lib/seed'

export default function Home() {
  return (
    <main className="container py-10">
      <header className="mb-8 flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2.5">
          <ListChecks className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Team Task Board
          </h1>
          <p className="text-sm text-muted-foreground">
            A shared view of what the team is working on this week.
          </p>
        </div>
      </header>
      <TaskBoard initialTasks={seedTasks} />
    </main>
  )
}
