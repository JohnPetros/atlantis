import { Outlet, useNavigation } from 'react-router'
import { AppLayout } from '@/ui/layouts/app-layout'
import { Loader2Icon } from 'lucide-react'

const Layout = () => {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  return (
    <AppLayout>
      {isLoading ? (
        <div className='w-full h-full flex items-center justify-center gap-3'>
          <Loader2Icon className='animate-spin' />
          Carregando...
        </div>
      ) : (
        <Outlet />
      )}
    </AppLayout>
  )
}

export default Layout
