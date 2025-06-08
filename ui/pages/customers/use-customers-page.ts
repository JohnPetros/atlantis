import type { CustomerDto } from 'core/dtos'
import { useActionContext } from 'ui/hooks'

export function useCustomersPage() {
  const action = useActionContext()

  async function handleCreateCustomer(customer: CustomerDto) {
    await action.dispatch('create-customer', customer)
  }

  async function handleUpdateCustomer(customer: CustomerDto) {
    await action.dispatch('update-customer', customer)
  }

  async function handleDeleteCustomer(customerId: string) {
    await action.dispatch('delete-customer', { customerId })
  }

  return {
    handleCreateCustomer,
    handleUpdateCustomer,
    handleDeleteCustomer,
  }
}
