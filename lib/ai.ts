// Tiny in-process "AI" provider. There is no real model behind this —
// it is a deterministic mock that simulates streaming, latency, and the
// occasional failure. The signature mirrors what a real LLM SDK would
// expose so the implementation can be swapped (OpenAI, Anthropic, local
// Ollama, etc.) without touching the call sites.

import type { Priority } from './types'

export interface CompletionRequest {
  prompt: string
  signal?: AbortSignal
}

export interface TaskSuggestion {
  title: string
  priority: Priority
  assignee: string
}

export class AIError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AIError'
  }
}

const FAILURE_RATE = 0.15
const FIRST_TOKEN_DELAY_MS = 220
const PER_TOKEN_DELAY_MS = 35

export async function* streamCompletion(
  req: CompletionRequest,
): AsyncGenerator<string, void, void> {
  await wait(FIRST_TOKEN_DELAY_MS, req.signal)
  if (Math.random() < FAILURE_RATE) {
    throw new AIError('The model is temporarily unavailable. Try again.')
  }
  for (const token of tokenize(mockResponseFor(req.prompt))) {
    await wait(
      PER_TOKEN_DELAY_MS + Math.random() * PER_TOKEN_DELAY_MS,
      req.signal,
    )
    yield token
  }
}

function tokenize(text: string): string[] {
  return text.match(/\S+\s*/g) ?? [text]
}

function wait(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(abortError())
    const id = setTimeout(resolve, ms)
    signal?.addEventListener('abort', () => {
      clearTimeout(id)
      reject(abortError())
    })
  })
}

function abortError(): DOMException {
  return new DOMException('Aborted by caller', 'AbortError')
}

const ASSIGNEES = ['Alex', 'Priya', 'Sam', 'Jordan'] as const

const PRIORITY_PATTERNS: Array<[RegExp, Priority]> = [
  [
    /security|hotfix|outage|incident|broken|fix|bug|p0|p1|critical|urgent|asap|blocker/,
    'high',
  ],
  [/refactor|cleanup|docs|polish|cosmetic|maintenance|nit|chore/, 'low'],
]

const ASSIGNEE_PATTERNS: Array<[RegExp, string]> = [
  [/security|auth|login|jwt|crypto|password|session/, 'Jordan'],
  [/billing|payment|invoice|stripe|charge|subscription|pricing/, 'Alex'],
  [/docs|onboard|copy|content|guide|tutorial|readme/, 'Priya'],
  [/analytic|metric|tracking|telemetry|event|dashboard|kpi/, 'Sam'],
]

const FRESH_TITLES = [
  'Set up incident response runbook',
  'Draft team OKRs for next quarter',
  'Audit third-party dependency vulnerabilities',
  'Improve onboarding checklist for new hires',
  'Migrate legacy logging to structured format',
]

const ABBREVIATIONS: Array<[RegExp, string]> = [
  [/\bauth\b/gi, 'authentication'],
  [/\bdb\b/gi, 'database'],
  [/\bci\b/gi, 'CI pipeline'],
  [/\bdocs\b/gi, 'documentation'],
  [/\bapi\b/gi, 'API'],
  [/\bui\b/gi, 'UI'],
  [/\bperf\b/gi, 'performance'],
]

function mockResponseFor(prompt: string): string {
  const lower = prompt.toLowerCase()
  const priority =
    PRIORITY_PATTERNS.find(([p]) => p.test(lower))?.[1] ?? 'medium'
  const assignee =
    ASSIGNEE_PATTERNS.find(([p]) => p.test(lower))?.[1] ??
    ASSIGNEES[Math.floor(Math.random() * ASSIGNEES.length)]
  const title = polishTitle(prompt)
  const suggestion: TaskSuggestion = { title, priority, assignee }
  return JSON.stringify(suggestion, null, 2)
}

function polishTitle(input: string): string {
  const trimmed = input.trim()
  if (!trimmed) {
    return FRESH_TITLES[Math.floor(Math.random() * FRESH_TITLES.length)]
  }
  let result = trimmed
  for (const [pattern, replacement] of ABBREVIATIONS) {
    result = result.replace(pattern, replacement)
  }
  result = result.replace(/[.!?]+$/, '')
  return result[0].toUpperCase() + result.slice(1)
}
