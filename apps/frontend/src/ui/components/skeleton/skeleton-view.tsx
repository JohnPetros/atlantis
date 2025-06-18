import { cn } from 'ui/utils'

type Props = React.ComponentProps<'div'>

export const SkeletonView = ({ className, ...props }: Props) => {
  return (
    <div
      data-slot='skeleton'
      className={cn('bg-accent animate-pulse rounded-md', className)}
      {...props}
    />
  )
}
