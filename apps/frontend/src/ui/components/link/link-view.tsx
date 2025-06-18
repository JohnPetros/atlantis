import type { ComponentProps, PropsWithChildren } from 'react'
import { NavLink } from 'react-router'

import { cn } from '@/ui/utils'

type Props = {
  to: string
} & ComponentProps<typeof NavLink>

export const LinkView = ({
  to,
  children,
  className,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <NavLink
      to={to}
      className={({ isActive, isPending, isTransitioning }) =>
        cn(
          'flex items-center gap-2',
          isActive && 'bg-primary text-primary-foreground',
          isPending && 'opacity-50',
          isTransitioning && 'opacity-50',
          className,
        )
      }
      {...props}
    >
      {children}
    </NavLink>
  )
}
