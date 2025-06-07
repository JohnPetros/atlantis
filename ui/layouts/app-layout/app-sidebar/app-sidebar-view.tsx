import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react'
import { Sidebar } from 'ui/components/sidebar'

const items = [
  {
    title: 'Home',
    url: '#',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
]

export const AppSidebarView = () => {
  return (
    <Sidebar.Container>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
          <Sidebar.GroupContent>
            <Sidebar.Menu>
              {items.map((item) => (
                <Sidebar.MenuItem key={item.title}>
                  <Sidebar.MenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </Sidebar.MenuButton>
                </Sidebar.MenuItem>
              ))}
            </Sidebar.Menu>
          </Sidebar.GroupContent>
        </Sidebar.Group>
      </Sidebar.Content>
    </Sidebar.Container>
  )
}
