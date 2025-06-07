import type { ComponentProps } from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

type Props = ComponentProps<typeof AlertDialogPrimitive.Trigger>

export const AlertDialogTriggerView = ({ ...props }: Props) => {
  return <AlertDialogPrimitive.Trigger data-slot='alert-dialog-trigger' {...props} />
}
