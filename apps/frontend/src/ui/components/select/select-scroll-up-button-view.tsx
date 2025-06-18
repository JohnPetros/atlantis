import * as SelectPrimitive from '@radix-ui/react-select'
import { ChevronUpIcon } from 'lucide-react'

import { cn } from '@/ui/utils'

type Props = React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>

export const SelectScrollUpButtonView = ({ className, ...props }: Props) => {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot='select-scroll-up-button'
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <ChevronUpIcon className='size-4' />
    </SelectPrimitive.ScrollUpButton>
  )
}
