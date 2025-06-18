import { useContext } from 'react'
import { ActionContext } from '@/ui/contexts/action-context'

export function useActionContext() {
  const context = useContext(ActionContext)

  if (!context) {
    throw new Error('useActionContext must be used within an ActionContextProvider')
  }

  return context
}
