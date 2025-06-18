import type { ComponentProps } from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'

type Props = ComponentProps<typeof SheetPrimitive.Root>

export const SheetContainerView = (props: Props) => {
  return <SheetPrimitive.Root data-slot='sheet' {...props} />
}
