import type { ComponentProps } from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

type Props = ComponentProps<typeof AlertDialogPrimitive.Portal>

export const AlertDialogPortalView = ({ ...props }: Props) => {
  return <AlertDialogPrimitive.Portal data-slot='alert-dialog-portal' {...props} />
}
