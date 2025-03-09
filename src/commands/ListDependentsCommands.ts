import { Storage } from '@/utils/Storage'
import { Command } from './Command'
import { ListCustomersCommand } from './ListCustomersCommand'
import { SelectCustomerCommand } from './SelectCustomerCommand'

export class ListDependentsCommand extends Command {
  async execute() {
    const subcommand = new SelectCustomerCommand(
      Storage.getInstance().customers,
      'titular',
    )
    const holder = await subcommand.execute()
    if (!holder.hasAnyDependent()) {
      this.output.error('Nenhum dependente para esse titular')
      return
    }

    this.subcommand = new ListCustomersCommand(holder.dependents)
    this.output.title(`Lista de dependentes do(a) cliente ${holder.name}`)
    await this.subcommand.execute()
  }
}
