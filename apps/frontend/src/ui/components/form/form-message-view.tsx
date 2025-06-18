import { useFormContext } from '@/ui/hooks/use-form-context'
import { cn } from '@/ui/utils'

type Props = React.ComponentProps<'p'>

export const FormMessageView = ({ className, ...props }: Props) => {
  const { error, formMessageId } = useFormContext()
  const body = error ? String(error?.message ?? '') : props.children

  if (!body) {
    return null
  }

  return (
    <p
      data-slot='form-message'
      id={formMessageId}
      className={cn('text-destructive text-xs', className)}
      {...props}
    >
      {body}
    </p>
  )
}
