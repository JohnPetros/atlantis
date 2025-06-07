import type { ComponentProps } from 'react'
import { cn } from 'ui/utils'

type Props = ComponentProps<'div'> & {
  className?: string
}

export const AlertDialogHeaderView = ({ className, ...props }: Props) => {
  return (
    <div
      data-slot='alert-dialog-header'
      className={cn('flex flex-col space-y-2 text-center sm:text-left', className)}
      {...props}
    />
  )
}
