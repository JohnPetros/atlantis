import { Command } from './Command'
import { DocumentEditingMenu } from '@/menus/DocumentEditingMenu'
import type { Document } from '@/entities/Document'
import { RgNumberValidator } from '@/validators/RgNumberValidator'

export class EditRgDocumentCommand extends Command {
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
    const validator = new RgNumberValidator(this.output)
    do {
      this.document.number = await this.input.text('Novo número do RG')
    } while (!validator.validate(this.document.number))
  }

  private async editExpeditionDate() {
    this.document.expeditionDate = await this.input.date(
      'Novo data de expedição do RG',
      this.output,
    )
  }
}
