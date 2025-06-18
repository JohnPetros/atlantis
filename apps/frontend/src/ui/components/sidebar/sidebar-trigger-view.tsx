import type { ComponentProps } from 'react'
import { PanelLeftIcon } from 'lucide-react'

import { cn } from '@/ui/utils'
import { Button } from '@/ui/components/button'
import { useSidebarContext } from '@/ui/hooks'

type Props = ComponentProps<typeof Button>

export const SidebarTriggerView = ({ className, onClick, ...props }: Props) => {
  const { toggleSidebar } = useSidebarContext()

  return (
    <Button
      data-slot='sidebar-trigger'
      data-sidebar='trigger'
      variant='ghost'
      size='icon'
      className={cn('size-7', className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeftIcon size={40} />
      <span className='sr-only'>Toggle Sidebar</span>
    </Button>
  )
}
