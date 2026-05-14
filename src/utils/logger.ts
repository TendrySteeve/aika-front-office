export const logError = (scope: string, error: unknown) => {
  if (import.meta.env.DEV) {
    console.error(`[${scope}]`, error)
  }
}
