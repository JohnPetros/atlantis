'use client'

import * as SelectPrimitive from '@radix-ui/react-select'

type Props = React.ComponentProps<typeof SelectPrimitive.Root>

export const SelectContainerView = ({ ...props }: Props) => {
  return <SelectPrimitive.Root data-slot='select' {...props} />
}
