import { ROUTES } from '@/constants/routes'
import { BedDouble, Building, Users, Waves } from 'lucide-react'
import { Link } from 'react-router'
import { Sidebar } from '@/ui/components/sidebar'

export const AppSidebarView = () => {
  return (
    <Sidebar.Container>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.GroupLabel className='flex items-center gap-1 text-2xl font-bold'>
            <Waves className='size-24' />
            Atlantis
          </Sidebar.GroupLabel>
          <Sidebar.GroupContent>
            <Sidebar.Menu className='mt-6'>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton asChild>
                  <Link to={ROUTES.customers}>
                    <Users />
                    <span>Clientes</span>
                  </Link>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton asChild>
                  <Link to={ROUTES.accommodations}>
                    <BedDouble />
                    <span>Acomodações</span>
                  </Link>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton asChild>
                  <Link to={ROUTES.hostings}>
                    <Building />
                    <span>Hospedagens</span>
                  </Link>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.GroupContent>
        </Sidebar.Group>
      </Sidebar.Content>
    </Sidebar.Container>
  )
}
