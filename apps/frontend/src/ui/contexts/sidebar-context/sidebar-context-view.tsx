import type { CSSProperties, PropsWithChildren } from 'react'

import { Tooltip } from 'ui/components/tooltip'
import { cn } from 'ui/utils/cn'

const SIDEBAR_WIDTH = '12rem'
const SIDEBAR_WIDTH_ICON = '3rem'

type Props = {
  className?: string
  style?: CSSProperties
}

export const SidebarContextView = ({
  children,
  className,
  style,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <Tooltip.Container delayDuration={0}>
      <div
        data-slot='sidebar-wrapper'
        style={
          {
            '--sidebar-width': SIDEBAR_WIDTH,
            '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
            ...style,
          } as CSSProperties
        }
        className={cn(
          'group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </Tooltip.Container>
  )
}
