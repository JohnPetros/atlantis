import type { ComponentProps } from 'react'

import { cn } from '@/ui/utils'

type Props = ComponentProps<'div'>

export const SidebarContentView = ({ className, ...props }: Props) => {
  return (
    <div
      data-slot='sidebar-content'
      data-sidebar='content'
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
        className,
      )}
      {...props}
    />
  )
}
