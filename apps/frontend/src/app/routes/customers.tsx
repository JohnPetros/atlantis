import type { Route } from './+types/customers'

import { Customer } from '@atlantis/core/entities'

import { CustomersPage } from '@/ui/pages/customers'
import { ActionContextProvider } from '@/ui/contexts/action-context'
import { customerService } from '@/services'

export async function clientAction({ request }: Route.ClientActionArgs) {
  const action = await request.json()

  if (action.name === 'create-customer') {
    const customer = Customer.create(action.payload)
    await customerService.createCustomer(customer.dto)
  }

  if (action.name === 'create-dependent') {
    const dependent = Customer.create(action.payload.dependent)
    await customerService.createDependent(action.payload.customerId, dependent.dto)
  }

  if (action.name === 'update-customer') {
    const customer = Customer.create(action.payload)
    await customerService.updateCustomer(customer.dto)
  }

  if (action.name === 'update-dependent') {
    const dependent = Customer.create(action.payload.dependent)
    await customerService.updateDependent(action.payload.customerId, dependent.dto)
  }

  if (action.name === 'delete-customer') {
    await customerService.deleteCustomer(action.payload.customerId)
  }

  if (action.name === 'delete-dependent') {
    await customerService.deleteDependent(
      action.payload.customerId,
      action.payload.dependentId,
    )
  }
}

export const clientLoader = async () => {
  return await customerService.getAllCustomers()
}

const CustomersRoute = () => {
  return (
    <ActionContextProvider>
      <CustomersPage />
    </ActionContextProvider>
  )
}

export default CustomersRoute
