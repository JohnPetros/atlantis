import type { ComponentProps } from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { cn } from '@/ui/utils'

type Props = ComponentProps<typeof AlertDialogPrimitive.Title> & {
  className?: string
}

export const AlertDialogTitleView = ({ className, ...props }: Props) => {
  return (
    <AlertDialogPrimitive.Title
      data-slot='alert-dialog-title'
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  )
}
