import type { PropsWithChildren, ReactNode } from 'react'
import { FormDialogView } from './form-dialog-view'
import { useFormDialog } from './use-form-dialog'

type Props = {
  title: string
  trigger: ReactNode
}

export const FormDialog = (props: PropsWithChildren<Props>) => {
  const { isOpen, handleOpenChange } = useFormDialog()
  return (
    <FormDialogView
      {...props}
      isOpen={isOpen}
      onOpenChange={(isOpen) => handleOpenChange(isOpen)}
    />
  )
}
