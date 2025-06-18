import type { ComponentProps } from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { cn } from '@/ui/utils'

type Props = ComponentProps<typeof AlertDialogPrimitive.Description> & {
  className?: string
}

export const AlertDialogDescriptionView = ({ className, ...props }: Props) => {
  return (
    <AlertDialogPrimitive.Description
      data-slot='alert-dialog-description'
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}
