import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import type { ComponentProps } from 'react'

type Props = ComponentProps<typeof DropdownMenuPrimitive.Sub>

export const DropdownMenuSubView = ({ ...props }: Props) => {
  return <DropdownMenuPrimitive.Sub data-slot='dropdown-menu-sub' {...props} />
}
