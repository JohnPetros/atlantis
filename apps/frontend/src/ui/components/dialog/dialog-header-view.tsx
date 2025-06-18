import type { ComponentProps } from 'react'
import { cn } from 'ui/utils'

type Props = ComponentProps<'div'> & {
  className?: string
}

export const DialogHeaderView = ({ className, ...props }: Props) => {
  return (
    <div
      data-slot='dialog-header'
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  )
}
