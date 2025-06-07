import type { ComponentProps } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

type Props = ComponentProps<typeof DialogPrimitive.Root>

export const DialogContainerView = ({ ...props }: Props) => {
  return <DialogPrimitive.Root data-slot='dialog' {...props} />
}
