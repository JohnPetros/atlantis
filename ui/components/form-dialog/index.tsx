import type { PropsWithChildren, ReactNode } from 'react'
import { FormDialogView } from './form-dialog-view'
import { useFormDialogView } from './use-form-dialog-view'

type Props = {
  title: string
  trigger: ReactNode
}

export const FormDialog = (props: PropsWithChildren<Props>) => {
  const { isOpen, handleOpenChange } = useFormDialogView()
  return (
    <FormDialogView
      {...props}
      isOpen={isOpen}
      onOpenChange={(isOpen) => handleOpenChange(isOpen)}
    />
  )
}
