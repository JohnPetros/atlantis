import { Command } from './Command'
import type { Document } from '@/entities/Document'
import { DocumentEditingMenu } from '@/menus/DocumentEditingMenu'
import { PassportNumberValidator } from '@/validators/PassportNumberValidator'

export class EditPassportDocumentCommand extends Command {
  constructor(private document: Document) {
    super()
    this.menu = new DocumentEditingMenu(this.input, document)
  }

  async execute() {
    const option = await this.menu.display()
    while (this.isExecuting) {
      switch (option) {
        case 'number':
          await this.editNumber()
          break
        case 'expeditionDate':
          await this.editExpeditionDate()
          break
        case 'exit':
          this.isExecuting = false
          this.output.clear()
          return
        default:
          this.output.error('Opção não entendida :(')
      }
    }
  }

  private async editNumber() {
    const validator = new PassportNumberValidator(this.output)
    do {
      this.document.number = await this.input.text('Novo número do Passport')
    } while (!validator.validate(this.document.number))
  }

  private async editExpeditionDate() {
    this.document.expeditionDate = await this.input.date(
      'Novo data de expedição do Passport',
      this.output,
    )
  }
}
