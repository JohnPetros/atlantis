import { createContext, useCallback, useEffect, type PropsWithChildren } from 'react'
import { useFetcher, type SubmitTarget } from 'react-router'
import { toast } from 'sonner'

type ActionContextValue = {
  dispatch: (name: string, payload: unknown) => Promise<void>
  isExecuting: boolean
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

  useEffect(() => {
    if (fetcher.data?.error) {
      toast.error(fetcher.data.error.message)
    }
  }, [fetcher.data?.error])

  return (
    <ActionContext.Provider
      value={{
        dispatch,
        isExecuting: fetcher.state === 'loading' || fetcher.state === 'submitting',
      }}
    >
      {children}
    </ActionContext.Provider>
  )
}
