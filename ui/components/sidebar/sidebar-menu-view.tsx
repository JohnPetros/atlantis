import type { ComponentProps } from 'react'
import { cn } from 'ui/utils'

type Props = ComponentProps<'ul'>

export const SidebarMenuView = ({ className, ...props }: Props) => {
  return (
    <ul
      data-slot='sidebar-menu'
      data-sidebar='menu'
      className={cn('flex w-full min-w-0 flex-col gap-1', className)}
      {...props}
    />
  )
}
