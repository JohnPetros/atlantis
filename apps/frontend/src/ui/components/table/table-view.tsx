import { cn } from '@/ui/utils'

type Props = React.ComponentProps<'table'>

export const TableView = ({ className, ...props }: Props) => {
  return (
    <table
      data-slot='table'
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  )
}
