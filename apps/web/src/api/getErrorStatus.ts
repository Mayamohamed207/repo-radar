export function getErrorStatus(error: unknown): unknown {
  return typeof error === 'object' && error !== null && 'status' in error ? error.status : undefined
}