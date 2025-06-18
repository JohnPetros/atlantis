import type { PropsWithChildren, ReactNode } from 'react'
import { Dialog } from '@/ui/components/dialog'

type Props = {
  title: string
  trigger: ReactNode
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export const FormDialogView = ({
  children,
  trigger,
  title,
  isOpen,
  onOpenChange,
}: PropsWithChildren<Props>) => {
  return (
    <Dialog.Container open={isOpen} onOpenChange={(isOpen) => onOpenChange(isOpen)}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Content className='w-[40rem] max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent'>
        <Dialog.Header>
          <Dialog.Title>{title}</Dialog.Title>
        </Dialog.Header>
        {children}
      </Dialog.Content>
    </Dialog.Container>
  )
}
