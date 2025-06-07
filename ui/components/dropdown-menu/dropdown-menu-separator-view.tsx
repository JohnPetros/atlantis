import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import type { ComponentProps } from 'react'
import { cn } from 'ui/utils'

type Props = ComponentProps<typeof DropdownMenuPrimitive.Separator> & {
  className?: string
}

export const DropdownMenuSeparatorView = ({ className, ...props }: Props) => {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot='dropdown-menu-separator'
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}
