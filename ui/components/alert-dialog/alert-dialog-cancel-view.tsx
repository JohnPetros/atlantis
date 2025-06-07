import type { ComponentProps } from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { cn } from 'ui/utils'

type Props = ComponentProps<typeof AlertDialogPrimitive.Cancel> & {
  className?: string
}

export const AlertDialogCancelView = ({ className, ...props }: Props) => {
  return (
    <AlertDialogPrimitive.Cancel
      data-slot='alert-dialog-cancel'
      className={cn(
        'border-input bg-background hover:bg-accent hover:text-accent-foreground mt-2 inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:mt-0',
        className,
      )}
      {...props}
    />
  )
}
