import { cn } from 'ui/utils'

type Props = React.ComponentProps<'div'>

export const TableContainerView = ({ className, ...props }: Props) => {
  return (
    <div
      data-slot='table-container'
      className={cn('relative w-full overflow-x-auto', className)}
      {...props}
    />
  )
}
