import type { CustomerDto } from 'core/dtos'
import { useActionContext } from 'ui/hooks'

export function useDependentsDialog(customerId: string) {
  const action = useActionContext()

  async function handleDeleteDependent(dependentId: string) {
    await action.dispatch('delete-dependent', { customerId, dependentId })
  }

  async function handleCreateDependent(dependent: CustomerDto) {
    await action.dispatch('create-dependent', { customerId, dependent })
  }

  async function handleUpdateDependent(dependent: CustomerDto) {
    await action.dispatch('update-dependent', { customerId, dependent })
  }

  return {
    handleDeleteDependent,
    handleCreateDependent,
    handleUpdateDependent,
  }
}
