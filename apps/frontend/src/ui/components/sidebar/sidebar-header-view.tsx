import type { ComponentProps } from 'react'

import { cn } from 'ui/utils'

type Props = ComponentProps<'div'>

export const SidebarHeaderView = ({ className, ...props }: Props) => {
  return (
    <div
      data-slot='sidebar-header'
      data-sidebar='header'
      className={cn(
        'flex min-h-[2.5rem] shrink-0 items-center gap-2 p-2',
        'group-data-[collapsible=icon]:justify-center',
        className,
      )}
      {...props}
    />
  )
}
