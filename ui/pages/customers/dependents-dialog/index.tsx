import type { CustomerDto } from 'core/dtos'
import { DependentDialogView } from './dependents-dialog-view'
import { useDependentsDialog } from './use-dependents-dialog'

type Props = {
  customerId: string
  dependents: CustomerDto[]
}

export const DependentsDialog = ({ dependents, customerId }: Props) => {
  const { handleDeleteDependent, handleCreateDependent, handleUpdateDependent } =
    useDependentsDialog(customerId)

  return (
    <DependentDialogView
      dependents={dependents}
      onDeleteCustomer={handleDeleteDependent}
      onCreateCustomer={handleCreateDependent}
      onUpdateCustomer={handleUpdateDependent}
    />
  )
}
