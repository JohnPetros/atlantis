import type { ComponentProps } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

type Props = ComponentProps<typeof DialogPrimitive.Trigger>

export const DialogTriggerView = ({ ...props }: Props) => {
  return <DialogPrimitive.Trigger data-slot='dialog-trigger' {...props} />
}
