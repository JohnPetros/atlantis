import type { ComponentProps } from 'react'

import { cn } from '@/ui/utils'

type Props = ComponentProps<'div'>

export const SidebarGroupView = ({ className, ...props }: Props) => {
  return (
    <div
      data-slot='sidebar-group'
      data-sidebar='group'
      className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
      {...props}
    />
  )
}
