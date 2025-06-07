import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import type { ComponentProps } from 'react'

type Props = ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>

export const DropdownMenuRadioGroupView = ({ ...props }: Props) => {
  return (
    <DropdownMenuPrimitive.RadioGroup data-slot='dropdown-menu-radio-group' {...props} />
  )
}
