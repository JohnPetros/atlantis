import { useId, type PropsWithChildren } from 'react'
import { FormItemContextProvider } from '@/ui/contexts/form-context'
import { cn } from '@/ui/utils'

type Props = PropsWithChildren<{
  className?: string
}>

export const FormItem = ({ className, ...props }: Props) => {
  const id = useId()

  return (
    <FormItemContextProvider value={{ id }}>
      <div
        data-slot='form-item'
        className={cn('grid gap-2 text-sm', className)}
        {...props}
      />
    </FormItemContextProvider>
  )
}
