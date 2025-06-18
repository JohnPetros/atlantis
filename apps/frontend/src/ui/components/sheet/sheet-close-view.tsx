import type { ComponentProps } from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'

type Props = ComponentProps<typeof SheetPrimitive.Close>

export const SheetCloseView = (props: Props) => {
  return <SheetPrimitive.Close data-slot='sheet-close' {...props} />
}
