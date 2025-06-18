import type { ComponentProps } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'

type Props = ComponentProps<typeof DialogPrimitive.Description> & {
  className?: string
}

export const DialogDescriptionView = ({ className, ...props }: Props) => {
  return (
    <DialogPrimitive.Description
      data-slot='dialog-description'
      className={['text-muted-foreground text-sm', className].filter(Boolean).join(' ')}
      {...props}
    />
  )
}
