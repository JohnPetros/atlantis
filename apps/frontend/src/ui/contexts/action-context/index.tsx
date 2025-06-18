import { createContext, useCallback, type PropsWithChildren } from 'react'
import { useFetcher, type SubmitTarget } from 'react-router'

type ActionContextValue = {
  dispatch: (name: string, payload: unknown) => Promise<void>
}

export const ActionContext = createContext<ActionContextValue | null>(null)

export function ActionContextProvider({ children }: PropsWithChildren) {
  const fetcher = useFetcher()

  const dispatch = useCallback(
    async (name: string, payload: unknown) => {
      await fetcher.submit({ name, payload } as SubmitTarget, {
        method: 'POST',
        encType: 'application/json',
      })
    },
    [fetcher.submit],
  )

  return <ActionContext.Provider value={{ dispatch }}>{children}</ActionContext.Provider>
}
