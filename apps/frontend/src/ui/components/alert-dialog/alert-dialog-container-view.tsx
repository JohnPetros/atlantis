import type { ComponentProps } from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

type Props = ComponentProps<typeof AlertDialogPrimitive.Root>

export const AlertDialogContainerView = ({ ...props }: Props) => {
  return <AlertDialogPrimitive.Root data-slot='alert-dialog' {...props} />
}
