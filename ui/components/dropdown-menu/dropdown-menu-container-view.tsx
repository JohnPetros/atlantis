import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import type { ComponentProps } from 'react'

type Props = ComponentProps<typeof DropdownMenuPrimitive.Root>

export const DropdownMenuContainerView = ({ ...props }: Props) => {
  return <DropdownMenuPrimitive.Root data-slot='dropdown-menu' {...props} />
}
