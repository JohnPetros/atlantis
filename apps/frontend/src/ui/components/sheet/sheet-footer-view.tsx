import type { ComponentProps } from 'react'
import { cn } from '@/ui/utils'

type Props = ComponentProps<'div'>

export const SheetFooterView = ({ className, ...props }: Props) => {
  return (
    <div
      data-slot='sheet-footer'
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  )
}
