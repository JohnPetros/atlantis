import { Command } from './Command'
import type { Document } from '@/entities/Document'
import { DocumentEditingMenu } from '@/menus/DocumentEditingMenu'
import { CpfNumberValidator } from '@/validators/CpfNumberValidator'

export class EditCpfDocumentCommand extends Command {
  constructor(private document: Document) {
    super()
    this.menu = new DocumentEditingMenu(this.input, document)
  }

  async execute() {
    this.output.clear()
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
          continue
      }

      this.isExecuting = false
    }
  }

  private async editNumber() {
    const validator = new CpfNumberValidator(this.output)
    do {
      this.document.number = await this.input.text('Novo número do CPF:')
    } while (!validator.validate(this.document.number))
  }

  private async editExpeditionDate() {
    this.document.expeditionDate = await this.input.date(
      'Novo data de expedição do CPF, no padrão dd/mm/yyyy:',
      this.output,
    )
  }
}
