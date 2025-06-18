import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import type { ComponentProps } from 'react'

type Props = ComponentProps<typeof DropdownMenuPrimitive.Trigger>

export const DropdownMenuTriggerView = ({ ...props }: Props) => {
  return <DropdownMenuPrimitive.Trigger data-slot='dropdown-menu-trigger' {...props} />
}
