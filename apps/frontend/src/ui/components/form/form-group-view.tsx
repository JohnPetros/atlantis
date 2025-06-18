import type { PropsWithChildren } from 'react'
import { cn } from '@/ui/utils'

type Props = PropsWithChildren<{
  className?: string
}>

export const FormGroupView = ({ children, className, ...props }: Props) => {
  return (
    <div className={cn('grid grid-cols-3 gap-3 gap-y-6 mt-3', className)} {...props}>
      {children}
    </div>
  )
}
