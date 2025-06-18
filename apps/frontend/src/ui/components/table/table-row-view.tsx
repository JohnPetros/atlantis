import { cn } from 'ui/utils'

type Props = React.ComponentProps<'tr'>

export const TableRowView = ({ className, ...props }: Props) => {
  return (
    <tr
      data-slot='table-row'
      className={cn(
        'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
        className,
      )}
      {...props}
    />
  )
}
