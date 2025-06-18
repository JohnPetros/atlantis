import type * as LabelPrimitive from '@radix-ui/react-label'
import { Label } from '@radix-ui/react-label'

import { useFormContext } from '@/ui/hooks/use-form-context'
import { cn } from '@/ui/utils'

type Props = React.ComponentProps<typeof LabelPrimitive.Root>

export const FormLabelView = ({ className, ...props }: Props) => {
  const { error, formItemId } = useFormContext()

  return (
    <Label
      data-slot='form-label'
      data-error={!!error}
      className={cn('data-[error=true]:text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  )
}
