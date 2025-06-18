import type { ComponentProps } from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'

type Props = ComponentProps<typeof SheetPrimitive.Trigger>

export const SheetTriggerView = ({ ...props }: Props) => {
  return <SheetPrimitive.Trigger data-slot='sheet-trigger' {...props} />
}
