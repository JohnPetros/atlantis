import { Command } from './Command'
import type { Customer } from '@/entities/Customer'
import { Storage } from '@/utils/Storage'
import { DependentEditingMenu } from '@/menus/DependentEditingMenu'
import { SelectCustomerCommand } from './SelectCustomerCommand'
import { EditDocumentsCommand } from './EditDocumentsCommand'

export class EditDependentCommand extends Command {
  constructor() {
    super()
    this.menu = new DependentEditingMenu(this.input)
  }

  async execute() {
    this.output.title('Selecione um cliente titular')
    let subcommand = new SelectCustomerCommand(Storage.getInstance().customers, 'titular')
    const holder = await subcommand.execute()
    if (!holder.hasAnyDependent()) {
      this.output.error('Nenhum dependente para esse titular')
      return
    }

    this.output.title(`Selecione um dependente do(a) titular ${holder.name}`)
    subcommand = new SelectCustomerCommand(holder.dependents, 'dependente')
    const dependent = await subcommand.execute()

    const option = await this.menu.display()
    switch (option) {
      case 'name':
        await this.editName(dependent)
        break
      case 'socialName':
        await this.editSocialName(dependent)
        break
      case 'birthDate':
        await this.editBirthDate(dependent)
        break
      case 'documents':
        await this.editDocuments(dependent)
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

  private async editDocuments(holder: Customer) {
    this.subcommand = new EditDocumentsCommand(holder)
    await this.subcommand.execute()
  }
}
