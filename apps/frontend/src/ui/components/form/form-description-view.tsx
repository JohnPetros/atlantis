import { useFormContext } from '@/ui/hooks/use-form-context'
import { cn } from '@/ui/utils'

type Props = React.ComponentProps<'p'>

export const FormDescriptionView = ({ className, ...props }: Props) => {
  const { formDescriptionId } = useFormContext()

  return (
    <p
      data-slot='form-description'
      id={formDescriptionId}
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}
