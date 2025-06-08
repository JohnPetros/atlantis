import type { Route } from './+types/customers'

import { CustomersPage } from 'ui/pages/customers'
import { Customer } from 'core/entities/Customer'
import { customersRepository } from 'repositories'
import { ActionContextProvider } from 'ui/contexts/action-context'

export async function clientAction({ request }: Route.ClientActionArgs) {
  const action = await request.json()

  if (action.name === 'create-customer') {
    const customer = Customer.create(action.payload)
    await customersRepository.add(customer.dto)
  }

  if (action.name === 'create-dependent') {
    const dependent = Customer.create(action.payload.dependent)
    await customersRepository.addDependent(action.payload.customerId, dependent.dto)
  }

  if (action.name === 'update-customer') {
    const customer = Customer.create(action.payload)
    await customersRepository.update(customer.dto)
  }

  if (action.name === 'update-dependent') {
    const dependent = Customer.create(action.payload.dependent)
    await customersRepository.updateDependent(action.payload.customerId, dependent.dto)
  }

  if (action.name === 'delete-customer') {
    await customersRepository.remove(action.payload.customerId)
  }

  if (action.name === 'delete-dependent') {
    await customersRepository.removeDependent(
      action.payload.customerId,
      action.payload.dependentId,
    )
  }
}

export const clientLoader = async () => {
  return await customersRepository.findAll()
}

const CustomersRoute = () => {
  return (
    <ActionContextProvider>
      <CustomersPage />
    </ActionContextProvider>
  )
}

export default CustomersRoute
