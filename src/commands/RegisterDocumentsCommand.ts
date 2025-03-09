import { DocumentTypeMenu } from '@/menus/DocumentTypeMenu'
import { Command } from './Command'
import type { Customer } from '@/entities/Customer'
import { RegisterRgDocumentCommand } from './RegisterRgDocumentCommand'
import { RegisterCPfDocumentCommand } from './RegisterCpfDocument'
import { RegisterPassportDocumentCommand } from './RegisterPassportDocumentCommand'
import { DocumentType } from '@/enums/DocumentType'

export class RegisterDocumentsCommand extends Command {
  constructor(private customer: Customer) {
    super()
    this.menu = new DocumentTypeMenu(this.input)
  }

  async execute() {
    this.output.clear()
    this.output.title('Cadastro de documento')

    while (this.isExecuting) {
      const option = await this.menu.display()
      switch (option) {
        case DocumentType.CPF:
          this.subcommand = new RegisterCPfDocumentCommand(this.customer)
          break
        case DocumentType.RG:
          this.subcommand = new RegisterRgDocumentCommand(this.customer)
          break
        case DocumentType.PASSAPORTE:
          this.subcommand = new RegisterPassportDocumentCommand(this.customer)
          break
        case 'exit':
          this.isExecuting = false
          this.output.clear()
          return
        default:
          this.output.error('Opção não entendida :(')
          continue
      }

      await this.subcommand.execute()
    }
  }
}
