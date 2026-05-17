import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TaskBoard } from '@/components/TaskBoard'
import { seedTasks } from '@/lib/seed'

describe('TaskBoard', () => {
  it('renders per-status counts in the summary header', () => {
    render(<TaskBoard initialTasks={seedTasks} />)

    expect(screen.getByTestId('count-todo')).toHaveTextContent('2')
    expect(screen.getByTestId('count-in-progress')).toHaveTextContent('2')
    expect(screen.getByTestId('count-done')).toHaveTextContent('2')
  })

  it('renders every seeded task in the list', () => {
    render(<TaskBoard initialTasks={seedTasks} />)

    for (const task of seedTasks) {
      expect(screen.getByText(task.title)).toBeInTheDocument()
    }
  })

  it('shows assignee and priority for each task', () => {
    render(<TaskBoard initialTasks={seedTasks} />)

    const row = screen.getByText('Draft onboarding doc').closest('li')
    expect(row).not.toBeNull()
    expect(within(row!).getByText('Priya')).toBeInTheDocument()
    expect(within(row!).getByText('medium')).toBeInTheDocument()
  })

  it('adds a new task via the create form', async () => {
    const user = userEvent.setup()
    render(<TaskBoard initialTasks={seedTasks} />)

    await user.type(screen.getByLabelText('Title'), 'Write release notes')
    await user.type(screen.getByLabelText('Assignee'), 'Riley')
    await user.click(screen.getByRole('button', { name: /add task/i }))

    expect(screen.getByText('Write release notes')).toBeInTheDocument()
    expect(screen.getByText('Riley')).toBeInTheDocument()
  })

  it('does not add a task when the title is empty', async () => {
    const user = userEvent.setup()
    render(<TaskBoard initialTasks={seedTasks} />)

    const before = screen.getAllByRole('listitem').length
    await user.type(screen.getByLabelText('Assignee'), 'Riley')
    await user.click(screen.getByRole('button', { name: /add task/i }))

    expect(screen.getAllByRole('listitem')).toHaveLength(before)
  })
})
