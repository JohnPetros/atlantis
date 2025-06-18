import * as PopoverPrimitive from '@radix-ui/react-popover'

type Props = React.ComponentProps<typeof PopoverPrimitive.Anchor>

export const PopoverAnchorView = ({ ...props }: Props) => {
  return <PopoverPrimitive.Anchor data-slot='popover-anchor' {...props} />
}
