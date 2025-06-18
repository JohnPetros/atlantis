import { cn } from 'ui/utils'

type Props = React.ComponentProps<'caption'>

export const TableCaptionView = ({ className, ...props }: Props) => {
  return (
    <caption
      data-slot='table-caption'
      className={cn('text-muted-foreground mt-4 text-sm', className)}
      {...props}
    />
  )
}
