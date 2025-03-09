import { Command } from './Command'
import type { Customer } from '@/entities/Customer'
import { Storage } from '@/utils/Storage'
import { SelectCustomerCommand } from './SelectCustomerCommand'
import { HolderEditingMenu } from '@/menus/HolderEditingMenu'
import { EditAddressCommand } from './EditAddressCommand'
import { EditCellphoneCommand } from './EditCellphoneCommand'
import { EditDocumentsCommand } from './EditDocumentsCommand'

export class EditHolderCommand extends Command {
  constructor() {
    super()
    this.menu = new HolderEditingMenu(this.input)
  }

  async execute() {
    this.output.title('Selecione um titular para editar')

    const subcommand = new SelectCustomerCommand(
      Storage.getInstance().customers,
      'titular',
    )
    const holder = await subcommand.execute()

    const option = await this.menu.display()
    switch (option) {
      case 'name':
        await this.editName(holder)
        break
      case 'socialName':
        await this.editSocialName(holder)
        break
      case 'birthDate':
        await this.editBirthDate(holder)
        break
      case 'address':
        await this.editAddress(holder)
        break
      case 'cellphones':
        await this.editCellphones(holder)
        break
      case 'documents':
        await this.editDocuments(holder)
        break
    }

    const storage = Storage.getInstance()
    storage.updateCustomer(holder)

    this.output.clear()
    this.output.success(`Cliente ${holder.name} editado(a)`)
  }

  private async editName(holder: Customer) {
    const newName = await this.input.text('Qual o novo nome do cliente?')
    holder.name = newName
  }

  private async editSocialName(holder: Customer) {
    const newSocialName = await this.input.text('Qual o novo nome social do cliente?')
    holder.socialName = newSocialName
  }

  private async editBirthDate(holder: Customer) {
    const newbirthDate = await this.input.date(
      'Qual a nova data de nascimento do cliente?',
      this.output,
    )
    holder.birthDate = newbirthDate
  }

  private async editAddress(holder: Customer) {
    this.subcommand = new EditAddressCommand(holder)
    await this.subcommand.execute()
  }

  private async editCellphones(holder: Customer) {
    this.subcommand = new EditCellphoneCommand(holder)
    await this.subcommand.execute()
  }

  private async editDocuments(holder: Customer) {
    this.subcommand = new EditDocumentsCommand(holder)
    await this.subcommand.execute()
  }
}
