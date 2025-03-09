import { Storage } from '@/utils/Storage'
import type { Customer } from '@/entities/Customer'
import { Command } from './Command'
import { ListCustomersCommand } from './ListCustomersCommand'

export class SelectCustomerCommand extends Command<Customer> {
  private customers: Customer[]
  private customerType: string

  constructor(customers: Customer[], customerType: string) {
    super()
    this.customers = customers
    this.subcommand = new ListCustomersCommand(this.customers)
    this.customerType = customerType
  }

  async execute() {
    this.subcommand.execute()
    const customer = await this.getCustomer()
    this.output.clear()
    return customer
  }

  private async getCustomer() {
    while (true) {
      const customerId = await this.input.text(`ID do ${this.customerType}:`)
      const customer = this.customers.find((customer) => customer.id === customerId)
      if (!customer) {
        this.output.error(`${this.customerType} não encontrado`)
        continue
      }
      return customer
    }
  }
}
