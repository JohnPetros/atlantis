import type { ComponentProps } from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { cn } from '@/ui/utils'

import { AlertDialogPortalView } from './alert-dialog-portal-view'
import { AlertDialogOverlayView } from './alert-dialog-overlay-view'

type Props = ComponentProps<typeof AlertDialogPrimitive.Content> & {
  className?: string
}

export const AlertDialogContentView = ({ className, children, ...props }: Props) => {
  return (
    <AlertDialogPortalView data-slot='alert-dialog-portal'>
      <AlertDialogOverlayView />
      <AlertDialogPrimitive.Content
        data-slot='alert-dialog-content'
        className={cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200',
          className,
        )}
        {...props}
      >
        {children}
      </AlertDialogPrimitive.Content>
    </AlertDialogPortalView>
  )
}
