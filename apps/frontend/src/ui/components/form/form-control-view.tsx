import { Slot } from '@radix-ui/react-slot'

import { useFormContext } from 'ui/hooks/use-form-context'

type Props = React.ComponentProps<typeof Slot>

export const FormControlView = ({ ...props }: Props) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormContext()

  return (
    <Slot
      data-slot='form-control'
      id={formItemId}
      aria-describedby={
        !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
}
