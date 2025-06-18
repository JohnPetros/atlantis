import { cn } from '@/ui/utils'

type Props = React.ComponentProps<'tfoot'>

export const TableFooterView = ({ className, ...props }: Props) => {
  return (
    <tfoot
      data-slot='table-footer'
      className={cn('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  )
}
