import type { ComponentProps } from 'react'
import { cn } from 'ui/utils'

type Props = ComponentProps<'li'>

export const SidebarMenuItemView = ({ className, ...props }: Props) => {
  return (
    <li
      data-slot='sidebar-menu-item'
      data-sidebar='menu-item'
      className={cn('group/menu-item relative', className)}
      {...props}
    />
  )
}
