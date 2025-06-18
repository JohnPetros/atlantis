import type { ComponentProps, PropsWithChildren } from 'react'

import { cn } from 'ui/utils'

type Props = ComponentProps<'h1'>

export const H1View = ({ className, ...props }: PropsWithChildren<Props>) => {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-3xl font-extrabold tracking-tight text-balance',
        className,
      )}
      {...props}
    />
  )
}
