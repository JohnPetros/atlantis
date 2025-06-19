import type { Route } from './+types/customers'

import { Customer } from '@atlantis/core/entities'

import { CustomersPage } from '@/ui/pages/customers'
import { ActionContextProvider } from '@/ui/contexts/action-context'
import { customersService } from '@/services'

export async function clientAction({ request }: Route.ClientActionArgs) {
  const action = await request.json()

  if (action.name === 'create-customer') {
    const customer = Customer.create(action.payload)
    const response = await customersService.createCustomer(customer.dto)
    if (!response.ok) {
      return { error: await response.json() }
    }
  }

  if (action.name === 'create-dependent') {
    const dependent = Customer.create(action.payload.dependent)
    const response = await customersService.createDependent(
      action.payload.customerId,
      dependent.dto,
    )
    if (!response.ok) {
      return { error: await response.json() }
    }
  }

  if (action.name === 'update-customer') {
    const customer = Customer.create(action.payload)
    const response = await customersService.updateCustomer(customer.dto)
    if (!response.ok) {
      return { error: await response.json() }
    }
  }

  if (action.name === 'update-dependent') {
    const dependent = Customer.create(action.payload.dependent)
    const response = await customersService.updateDependent(
      action.payload.customerId,
      dependent.dto,
    )
    if (!response.ok) {
      return { error: await response.json() }
    }
  }

  if (action.name === 'delete-customer') {
    const response = await customersService.deleteCustomer(action.payload.customerId)
    if (!response.ok) {
      return { error: await response.json() }
    }
  }

  if (action.name === 'delete-dependent') {
    const response = await customersService.deleteDependent(
      action.payload.customerId,
      action.payload.dependentId,
    )
    if (!response.ok) {
      return { error: await response.json() }
    }
  }
}

export const clientLoader = async () => {
  return await customersService.getAllCustomers()
}

const CustomersRoute = () => {
  return (
    <ActionContextProvider>
      <CustomersPage />
    </ActionContextProvider>
  )
}

export default CustomersRoute
