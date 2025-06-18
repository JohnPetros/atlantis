import type { ComponentProps } from 'react'
import { cn } from '@/ui/utils'

type Props = ComponentProps<'div'> & {
  className?: string
}

export const AlertDialogFooterView = ({ className, ...props }: Props) => {
  return (
    <div
      data-slot='alert-dialog-footer'
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        className,
      )}
      {...props}
    />
  )
}
