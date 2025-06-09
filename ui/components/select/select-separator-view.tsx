import * as SelectPrimitive from '@radix-ui/react-select'

import { cn } from 'ui/utils'

type Props = React.ComponentProps<typeof SelectPrimitive.Separator>

export const SelectSeparatorView = ({ className, ...props }: Props) => {
  return (
    <SelectPrimitive.Separator
      data-slot='select-separator'
      className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}
