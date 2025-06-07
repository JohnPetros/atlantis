import type { ComponentProps } from 'react'

import { Input } from '../input'
import { cn } from 'ui/utils'

type Props = ComponentProps<typeof Input>

export const SidebarInputView = ({ className, ...props }: Props) => {
  return (
    <Input
      data-slot='sidebar-input'
      data-sidebar='input'
      className={cn('bg-background h-8 w-full shadow-none', className)}
      {...props}
    />
  )
}
