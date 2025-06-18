import type { ComponentProps } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

type Props = ComponentProps<typeof TooltipPrimitive.Provider>

export const TooltipProviderView = ({ delayDuration = 0, ...props }: Props) => {
  return (
    <TooltipPrimitive.Provider
      data-slot='tooltip-provider'
      delayDuration={delayDuration}
      {...props}
    />
  )
}
