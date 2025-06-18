import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import type { ComponentProps } from 'react'

type Props = ComponentProps<typeof DropdownMenuPrimitive.Portal>

export const DropdownMenuPortalView = ({ ...props }: Props) => {
  return <DropdownMenuPrimitive.Portal data-slot='dropdown-menu-portal' {...props} />
}
