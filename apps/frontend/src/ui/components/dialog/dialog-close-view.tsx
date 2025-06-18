import type { ComponentProps } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

type Props = ComponentProps<typeof DialogPrimitive.Close>

export const DialogCloseView = ({ ...props }: Props) => {
  return <DialogPrimitive.Close data-slot='dialog-close' {...props} />
}
