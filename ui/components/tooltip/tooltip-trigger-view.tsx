import type { ComponentProps } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

type Props = ComponentProps<typeof TooltipPrimitive.Trigger>

export const TooltipTriggerView = ({ ...props }: Props) => {
  return <TooltipPrimitive.Trigger data-slot='tooltip-trigger' {...props} />
}
