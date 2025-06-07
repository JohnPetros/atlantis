import * as PopoverPrimitive from '@radix-ui/react-popover'

type Props = React.ComponentProps<typeof PopoverPrimitive.Trigger>

export const PopoverTriggerView = ({ ...props }: Props) => {
  return <PopoverPrimitive.Trigger data-slot='popover-trigger' {...props} />
}
