import type { ComponentProps } from 'react'

import { Separator } from '../separator'
import { cn } from '@/ui/utils'

type Props = ComponentProps<typeof Separator>

export const SidebarSeparatorView = ({ className, ...props }: Props) => {
  return (
    <Separator
      data-slot='sidebar-separator'
      data-sidebar='separator'
      className={cn('bg-sidebar-border mx-2 w-auto', className)}
      {...props}
    />
  )
}
