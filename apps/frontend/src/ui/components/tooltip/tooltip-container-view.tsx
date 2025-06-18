import type { ComponentProps } from 'react'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'

type Props = {
  delayDuration?: number
} & ComponentProps<typeof TooltipPrimitive.Root>

export const TooltipContainerView = ({ delayDuration = 0, ...props }: Props) => {
  return (
    <TooltipPrimitive.Provider
      data-slot='tooltip-provider'
      delayDuration={delayDuration}
      {...props}
    >
      <TooltipPrimitive.Root data-slot='tooltip' {...props} />
    </TooltipPrimitive.Provider>
  )
}
