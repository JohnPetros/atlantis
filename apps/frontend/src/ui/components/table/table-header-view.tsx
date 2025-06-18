import { cn } from '@/ui/utils'

type Props = React.ComponentProps<'thead'>

export const TableHeaderView = ({ className, ...props }: Props) => {
  return (
    <thead
      data-slot='table-header'
      className={cn('[&_tr]:border-b', className)}
      {...props}
    />
  )
}
