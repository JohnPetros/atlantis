import { Command } from './Command'
import type { Customer } from '@/entities/Customer'
import { DocumentType } from '@/enums/DocumentType'
import { Document } from '@/entities/Document'
import { RgNumberValidator } from '@/validators/RgNumberValidator'

export class RegisterRgDocumentCommand extends Command {
  private customer: Customer
  constructor(customer: Customer) {
    super()
    this.customer = customer
  }

  async execute() {
    if (this.customer.hasRg()) {
      this.output.error('RG já cadastrado para esse cliente')
      return
    }

    while (true) {
      const number = await this.input.text('Qual o número do seu RG?')
      const validator = new RgNumberValidator(this.output)
      if (!validator.validate(number)) continue
      const expeditionDate = await this.input.date(
        'Qual a data de expedição do seu RG?',
        this.output,
      )
      const rg = new Document({
        number,
        expeditionDate,
        type: DocumentType.RG,
      })
      this.customer.documents.push(rg)
      this.output.success('RG adicionado!')
      return
    }
  }
}
