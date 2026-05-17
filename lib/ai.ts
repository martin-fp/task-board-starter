// Tiny in-process "AI" provider. There is no real model behind this —
// it is a deterministic mock that simulates streaming, latency, and the
// occasional failure. The signature mirrors what a real LLM SDK would
// expose so the implementation can be swapped (OpenAI, Anthropic, local
// Ollama, etc.) without touching the call sites.

export interface CompletionRequest {
  prompt: string
  signal?: AbortSignal
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

function mockResponseFor(prompt: string): string {
  const lower = prompt.toLowerCase()
  if (
    /security|hotfix|outage|incident|broken|fix|bug|p0|p1|critical|urgent|asap|blocker/.test(
      lower,
    )
  ) {
    return 'high — this looks time-sensitive or user-impacting and should be handled before standard work.'
  }
  if (
    /refactor|cleanup|docs|polish|cosmetic|maintenance|nit|chore/.test(lower)
  ) {
    return 'low — internal quality work with no immediate user impact.'
  }
  return 'medium — standard scope, can be slotted into the regular queue.'
}
