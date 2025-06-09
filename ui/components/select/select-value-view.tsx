import * as SelectPrimitive from '@radix-ui/react-select'

type Props = React.ComponentProps<typeof SelectPrimitive.Value>

export function SelectValueView({ ...props }: Props) {
  return <SelectPrimitive.Value data-slot='select-value' {...props} />
}
