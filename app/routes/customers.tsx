import type { CustomerDto } from 'core/dtos'
import type { Route } from './+types/customers'

import { CustomersPage } from 'ui/pages/customers'
import { Customer } from 'core/entities/Customer'
import { customersRepository } from 'repositories'

export async function clientAction({ request }: Route.ClientActionArgs) {
  if (request.method === 'DELETE') {
    const { customerId } = (await request.json()) as { customerId: string }
    await customersRepository.remove(customerId)
  }

  if (request.method === 'POST') {
    const customerDto = (await request.json()) as CustomerDto
    const customer = Customer.create(customerDto)
    await customersRepository.add(customer.dto)
  }

  if (request.method === 'PUT') {
    const customerDto = (await request.json()) as CustomerDto
    const customer = Customer.create(customerDto)
    await customersRepository.update(customer.dto)
  }
}

export const clientLoader = async () => {
  return await customersRepository.findAll()
}

const CustomersRoute = () => {
  return <CustomersPage />
}

export default CustomersRoute
