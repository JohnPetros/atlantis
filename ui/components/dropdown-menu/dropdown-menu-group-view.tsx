import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import type { ComponentProps } from 'react'

type Props = ComponentProps<typeof DropdownMenuPrimitive.Group>

export const DropdownMenuGroupView = ({ ...props }: Props) => {
  return <DropdownMenuPrimitive.Group data-slot='dropdown-menu-group' {...props} />
}
