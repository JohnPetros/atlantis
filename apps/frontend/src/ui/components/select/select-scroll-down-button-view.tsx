import * as SelectPrimitive from '@radix-ui/react-select'
import { ChevronDownIcon } from 'lucide-react'

import { cn } from '@/ui/utils'

type Props = React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>

export const SelectScrollDownButtonView = ({ className, ...props }: Props) => {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot='select-scroll-down-button'
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <ChevronDownIcon className='size-4' />
    </SelectPrimitive.ScrollDownButton>
  )
}
