import type { ComponentProps } from 'react'
import { cn } from '@/ui/utils'

type Props = ComponentProps<'div'>

export const SidebarFooterView = ({ className, ...props }: Props) => {
  return (
    <div
      data-slot='sidebar-footer'
      data-sidebar='footer'
      className={cn('flex flex-col gap-2 p-2', className)}
      {...props}
    />
  )
}
