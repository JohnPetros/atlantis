import type { ComponentProps } from 'react'

import { Separator } from 'ui/components/separator'
import { cn } from 'ui/utils'

type Props = ComponentProps<'h3'>

export const FormGroupTitleView = ({ children, className, ...props }: Props) => {
  return (
    <h3 className={cn('mt-6 text-md font-semibold', className)} {...props}>
      {children}
      <Separator className='mt-3' />
    </h3>
  )
}
