import type { Customer } from '@/entities/Customer'
import { Command } from './Command'

export class ListCustomersCommand extends Command {
  private customers: Customer[]

  constructor(customers: Customer[]) {
    super()
    this.customers = customers
  }
  async execute() {
    this.output.table(
      this.customers.map((holder) => ({
        ID: holder.id,
        Nome: holder.name,
        'Nome Social': holder.socialName,
        Endereço: holder.address.formattedValue,
        Documentos: holder.documents
          .map((document) => document.formattedNumber)
          .join('; '),
        Telefones: holder.cellphones
          .map((cellphone) => cellphone.formattedValue)
          .join('; '),
      })),
    )
  }
}
