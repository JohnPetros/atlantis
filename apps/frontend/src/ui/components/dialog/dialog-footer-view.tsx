import type { ComponentProps } from 'react'
import { cn } from 'ui/utils'

type Props = ComponentProps<'div'> & {
  className?: string
}

export const DialogFooterView = ({ className, ...props }: Props) => {
  return (
    <div
      data-slot='dialog-footer'
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  )
}
