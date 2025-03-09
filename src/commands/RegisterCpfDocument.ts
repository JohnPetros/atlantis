import { Command } from './Command'
import type { Customer } from '@/entities/Customer'
import { DocumentType } from '@/enums/DocumentType'
import { Document } from '@/entities/Document'

export class RegisterCPfDocumentCommand extends Command {
  private customer: Customer
  constructor(customer: Customer) {
    super()
    this.customer = customer
  }

  async execute() {
    if (this.customer.hasCpf()) {
      this.output.error('CPF já cadastrado para esse cliente')
      return
    }

    while (true) {
      const number = await this.input.text('Qual o número do seu CPF?')
      if (!this.isValidCpfNumber(number)) continue

      const expeditionDate = await this.input.date(
        'Qual a data de expedição do seu CPF?',
        this.output,
      )
      const cpf = new Document({
        number,
        expeditionDate,
        type: DocumentType.CPF,
      })
      this.customer.documents.push(cpf)
      this.output.success('CPF adicionado!')
      return
    }
  }

  private isValidCpfNumber(number: string) {
    if (Number.isNaN(Number(number)) || number.length !== 11) {
      this.output.error('CPF deve conter 11 dígitos numéricos')
      return false
    }
    return true
  }
}
