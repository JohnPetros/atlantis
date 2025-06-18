import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import type { ComponentProps } from 'react'
import { cn } from '@/ui/utils'

type Props = ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  className?: string
  inset?: boolean
}

export const DropdownMenuLabelView = ({ className, inset, ...props }: Props) => {
  return (
    <DropdownMenuPrimitive.Label
      data-slot='dropdown-menu-label'
      data-inset={inset}
      className={cn('px-2 py-1.5 text-sm font-medium data-[inset]:pl-8', className)}
      {...props}
    />
  )
}
