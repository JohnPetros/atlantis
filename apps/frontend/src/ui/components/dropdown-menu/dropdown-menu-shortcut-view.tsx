import type { ComponentProps } from 'react'
import { cn } from 'ui/utils'

type Props = ComponentProps<'span'> & {
  className?: string
}

export const DropdownMenuShortcutView = ({ className, ...props }: Props) => {
  return (
    <span
      data-slot='dropdown-menu-shortcut'
      className={cn('text-muted-foreground ml-auto text-xs tracking-widest', className)}
      {...props}
    />
  )
}
