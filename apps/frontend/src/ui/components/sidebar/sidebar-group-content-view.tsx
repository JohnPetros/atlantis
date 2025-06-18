import type { ComponentProps } from 'react'

import { cn } from '@/ui/utils'

type Props = ComponentProps<'div'>

export const SidebarGroupContentView = ({ className, ...props }: Props) => {
  return (
    <div
      data-slot='sidebar-group-content'
      data-sidebar='group-content'
      className={cn('w-full text-sm', className)}
      {...props}
    />
  )
}
