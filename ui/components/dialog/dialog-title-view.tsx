import type { ComponentProps } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cn } from 'ui/utils'

type Props = ComponentProps<typeof DialogPrimitive.Title> & {
  className?: string
}

export const DialogTitleView = ({ className, ...props }: Props) => {
  return (
    <DialogPrimitive.Title
      data-slot='dialog-title'
      className={cn('text-lg leading-none font-semibold', className)}
      {...props}
    />
  )
}
