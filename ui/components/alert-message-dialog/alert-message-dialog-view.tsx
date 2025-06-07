import type { PropsWithChildren, ReactNode } from 'react'

import { AlertDialog } from '../alert-dialog'

type Props = {
  trigger: ReactNode
  onConfirm: () => void
}

export const AlertMessageDialogView = ({
  trigger,
  children,
  onConfirm,
}: PropsWithChildren<Props>) => {
  return (
    <AlertDialog.Container>
      <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Mensagem de alerta</AlertDialog.Title>
          <AlertDialog.Description>{children}</AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={onConfirm}>Confirmar</AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Container>
  )
}
