import { Command } from './Command'
import type { Customer } from '@/entities/Customer'
import { DocumentType } from '@/enums/DocumentType'
import { Document } from '@/entities/Document'
import { PassportNumberValidator } from '@/validators/PassportNumberValidator'

export class RegisterPassportDocumentCommand extends Command {
  private customer: Customer
  constructor(customer: Customer) {
    super()
    this.customer = customer
  }

  async execute() {
    if (this.customer.hasPassport()) {
      this.output.error('Passporte já cadastrado para esse cliente')
      return
    }

    while (true) {
      const number = await this.input.text(
        'Qual o número do seu passporte, no padrão (LDDDDDDDD)?',
      )
      const validator = new PassportNumberValidator(this.output)
      if (!validator.validate(number)) continue

      const expeditionDate = await this.input.date(
        'Qual a data de expedição do seu passporte?',
        this.output,
      )
      const passport = new Document({
        number,
        expeditionDate,
        type: DocumentType.PASSAPORTE,
      })
      this.customer.documents.push(passport)
      this.output.success('Passaporte adicionado!')
      return
    }
  }
}
