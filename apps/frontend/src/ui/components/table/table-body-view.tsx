import { cn } from '@/ui/utils'

type Props = React.ComponentProps<'tbody'>

export const TableBodyView = ({ className, ...props }: Props) => {
  return (
    <tbody
      data-slot='table-body'
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
}
