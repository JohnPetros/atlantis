import type { ComponentProps } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

type Props = ComponentProps<typeof DialogPrimitive.Portal>

export const DialogPortalView = ({ ...props }: Props) => {
  return <DialogPrimitive.Portal data-slot='dialog-portal' {...props} />
}
