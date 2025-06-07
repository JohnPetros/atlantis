import type { CustomerDto } from 'core/dtos'
import { CustomersFaker } from 'core/fakers/CustomersFaker'

export const CustomersRepository = () => {
  let customers = CustomersFaker.fakeMany(10).map((customer) => customer.dto)

  return {
    async findAll() {
      return customers
    },

    async findById(id: string) {
      return customers.find((customer) => customer.id === id)
    },

    async add(customer: CustomerDto) {
      customers.unshift(customer)
    },

    async update(customer: CustomerDto) {
      const index = customers.findIndex(
        (currentCustomer) => currentCustomer.id === customer.id,
      )
      customers[index] = customer
    },

    async remove(id: string) {
      customers = customers.filter((customer) => customer.id !== id)
    },
  }
}
