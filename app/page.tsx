import { TaskBoard } from '@/components/TaskBoard'
import { seedTasks } from '@/lib/seed'

export default function Home() {
  return (
    <main className="container py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Team Task Board</h1>
        <p className="text-sm text-muted-foreground">
          A shared view of what the team is working on this week.
        </p>
      </header>
      <TaskBoard initialTasks={seedTasks} />
    </main>
  )
}
