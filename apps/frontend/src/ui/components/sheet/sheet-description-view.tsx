import type { ComponentProps } from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { cn } from 'ui/utils'

type Props = ComponentProps<typeof SheetPrimitive.Description>

export const SheetDescriptionView = ({ className, ...props }: Props) => {
  return (
    <SheetPrimitive.Description
      data-slot='sheet-description'
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}
