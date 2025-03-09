import { Command } from './Command'
import type { Customer } from '@/entities/Customer'
import { DocumentSelectingMenu } from '@/menus/DocumentSelectingMenu'
import { DocumentType } from '@/enums/DocumentType'
import { EditCpfDocumentCommand } from './EditCpfDocumentCommand'
import { EditRgDocumentCommand } from './EditRgDocumentCommand'
import { EditPassportDocumentCommand } from './EditPassportDocumentCommand'
import { DocumentCrudMenu } from '@/menus/DocumentCrudMenu'
import { RegisterDocumentsCommand } from './RegisterDocumentsCommand'

export class EditDocumentsCommand extends Command {
  constructor(private customer: Customer) {
    super()
  }

  async execute() {
    this.output.clear()
    this.menu = new DocumentCrudMenu(this.input)
    const option = await this.menu.display()
    switch (option) {
      case 'edit':
        await this.editDocument()
        break
      case 'register':
        await this.registerDocument()
        break
      case 'remove':
        await this.removeDocument()
        break
    }
  }

  private async selectDocument() {
    this.menu = new DocumentSelectingMenu(this.input, this.customer.documents)
    const option = await this.menu.display()
    return this.customer.documents.find((_, index) => index + 1 === Number(option))
  }

  private async registerDocument() {
    this.subcommand = new RegisterDocumentsCommand(this.customer)
    await this.subcommand.execute()
  }

  private async removeDocument() {
    const document = await this.selectDocument()
    if (document) this.customer.removeDocument(document)
  }

  private async editDocument() {
    const document = await this.selectDocument()

    if (document)
      switch (document.type) {
        case DocumentType.CPF:
          this.subcommand = new EditCpfDocumentCommand(document)
          break
        case DocumentType.RG:
          this.subcommand = new EditRgDocumentCommand(document)
          break
        case DocumentType.PASSAPORTE:
          this.subcommand = new EditPassportDocumentCommand(document)
          break
      }

    await this.subcommand.execute()
  }
}
