import { createContext, type PropsWithChildren } from 'react'

import type { SidebarContextValue } from './sidebar-context-props'
import { useSidebarContextProvider } from './use-sidebar-context-provider'
import { SidebarContextView } from './sidebar-context-view'

export const SidebarContext = createContext<SidebarContextValue | null>(null)

type Props = {
  isDefaultOpen?: boolean
}

export function SidebarContextProvider({
  isDefaultOpen = true,
  children,
}: PropsWithChildren<Props>) {
  const value = useSidebarContextProvider(isDefaultOpen)
  return (
    <SidebarContext.Provider value={value}>
      <SidebarContextView>{children}</SidebarContextView>
    </SidebarContext.Provider>
  )
}
