import type { PropsWithChildren } from 'react'

import { Sidebar } from 'ui/components/sidebar'
import { SidebarContextProvider } from 'ui/contexts/sidebar-context'
import { AppSidebar } from './app-sidebar'

export const AppLayoutView = ({ children }: PropsWithChildren) => {
  return (
    <SidebarContextProvider>
      <AppSidebar />
      <main className='px-6 pt-3'>
        <Sidebar.Trigger />
        <div className='py-2'>{children}</div>
      </main>
    </SidebarContextProvider>
  )
}
