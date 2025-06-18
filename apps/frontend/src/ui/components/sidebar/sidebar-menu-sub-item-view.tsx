import type { ComponentProps } from 'react'
import { cn } from 'ui/utils'

type Props = ComponentProps<'li'>

export const SidebarMenuSubItemView = ({ className, ...props }: Props) => {
  return (
    <li
      data-slot='sidebar-menu-sub-item'
      data-sidebar='menu-sub-item'
      className={cn('group/menu-sub-item relative', className)}
      {...props}
    />
  )
}
