import type { CustomerDto } from 'core/dtos'
import { useFetcher } from 'react-router'

export const useCustomersTable = () => {
  const fetcher = useFetcher()

  async function handleDeleteCustomer(customerId: string) {
    await fetcher.submit(
      {
        customerId,
      },
      { method: 'DELETE', encType: 'application/json' },
    )
  }

  async function handleCreateCustomer(customer: CustomerDto) {
    await fetcher.submit(customer, { method: 'POST', encType: 'application/json' })
  }

  async function handleUpdateCustomer(customer: CustomerDto) {
    await fetcher.submit(customer, { method: 'PUT', encType: 'application/json' })
  }

  return {
    handleDeleteCustomer,
    handleCreateCustomer,
    handleUpdateCustomer,
  }
}
