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

    async addDependent(customerId: string, dependent: CustomerDto) {
      const customer = await this.findById(customerId)
      if (!customer) return

      customer.dependents.unshift(dependent)
    },

    async update(customer: CustomerDto) {
      const index = customers.findIndex(
        (currentCustomer) => currentCustomer.id === customer.id,
      )
      customers[index] = customer
    },

    async updateDependent(customerId: string, dependent: CustomerDto) {
      const customer = await this.findById(customerId)
      console.log('customer', customer)
      if (!customer) return

      customer.dependents = customer.dependents.filter((currentDependent) =>
        currentDependent.id === dependent.id ? dependent : currentDependent,
      )
    },

    async remove(id: string) {
      customers = customers.filter((customer) => customer.id !== id)
    },

    async removeDependent(customerId: string, dependentId: string) {
      const customer = await this.findById(customerId)
      if (!customer) return

      customer.dependents = customer.dependents.filter(
        (dependent) => dependent.id !== dependentId,
      )
    },
  }
}
