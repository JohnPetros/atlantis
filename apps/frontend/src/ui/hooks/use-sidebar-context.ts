import { useContext } from 'react'

import { SidebarContext } from 'ui/contexts/sidebar-context'

export function useSidebarContext() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.')
  }
  return context
}
