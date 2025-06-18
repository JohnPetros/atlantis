import * as SeparatorPrimitive from '@radix-ui/react-separator'

import { cn } from 'ui/utils'

type Props = React.ComponentProps<typeof SeparatorPrimitive.Root>

export const SeparatorView = ({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: Props) => {
  return (
    <SeparatorPrimitive.Root
      data-slot='separator'
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        className,
      )}
      {...props}
    />
  )
}
