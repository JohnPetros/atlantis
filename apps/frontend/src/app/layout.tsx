import { Outlet } from 'react-router'
import { AppLayout } from '@/ui/layouts/app-layout'

const Layout = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}

export default Layout
