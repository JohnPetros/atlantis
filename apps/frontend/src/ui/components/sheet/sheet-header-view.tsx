import type { ComponentProps } from 'react'
import { cn } from 'ui/utils'

type Props = ComponentProps<'div'>

export const SheetHeaderView = ({ className, ...props }: Props) => {
  return (
    <div
      data-slot='sheet-header'
      className={cn('flex flex-col gap-1.5 p-4', className)}
      {...props}
    />
  )
}
