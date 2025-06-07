import type { ComponentProps } from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { cn } from 'ui/utils'

type Props = ComponentProps<typeof AlertDialogPrimitive.Action> & {
  className?: string
}

export const AlertDialogActionView = ({ className, ...props }: Props) => {
  return (
    <AlertDialogPrimitive.Action
      data-slot='alert-dialog-action'
      className={cn(
        'bg-slate-800 text-slate-50 hover:bg-slate-800/90 inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}
