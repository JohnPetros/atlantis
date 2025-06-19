import type { CustomerDto } from '@atlantis/core/dtos'
import { BACKEND_BASE_URL } from '@/constants'

export const CustomersService = () => {
  return {
    async getAllCustomers() {
      const response = await fetch(`${BACKEND_BASE_URL}/customers`)
      return response.json() as Promise<CustomerDto[]>
    },

    async getCustomerById(customerId: string) {
      const response = await fetch(`${BACKEND_BASE_URL}/customers/${customerId}`)
      return response.json() as Promise<CustomerDto>
    },

    async createCustomer(customer: CustomerDto) {
      return await fetch(`${BACKEND_BASE_URL}/customers`, {
        method: 'POST',
        body: JSON.stringify(customer),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    },

    async updateCustomer(customer: CustomerDto) {
      return await fetch(`${BACKEND_BASE_URL}/customers/${customer.id}`, {
        method: 'PUT',
        body: JSON.stringify(customer),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    },

    async updateDependent(customerId: string, dependent: CustomerDto) {
      return await fetch(
        `${BACKEND_BASE_URL}/customers/${customerId}/dependents/${dependent.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(dependent),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    },

    async deleteDependent(customerId: string, dependentId: string) {
      return await fetch(
        `${BACKEND_BASE_URL}/customers/${customerId}/dependents/${dependentId}`,
        {
          method: 'DELETE',
        },
      )
    },

    async createDependent(customerId: string, dependent: CustomerDto) {
      return await fetch(`${BACKEND_BASE_URL}/customers/${customerId}/dependents`, {
        method: 'POST',
        body: JSON.stringify(dependent),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    },

    async deleteCustomer(customerId: string) {
      return await fetch(`${BACKEND_BASE_URL}/customers/${customerId}`, {
        method: 'DELETE',
      })
    },
  }
}
