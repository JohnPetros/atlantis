import * as SelectPrimitive from '@radix-ui/react-select'

import { cn } from '@/ui/utils'

type Props = React.ComponentProps<typeof SelectPrimitive.Label>

export const SelectLabelView = ({ className, ...props }: Props) => {
  return (
    <SelectPrimitive.Label
      data-slot='select-label'
      className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
      {...props}
    />
  )
}
