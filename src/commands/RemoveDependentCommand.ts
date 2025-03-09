import { Command } from './Command'
import { Storage } from '@/utils/Storage'
import { SelectCustomerCommand } from './SelectCustomerCommand'

export class RemoveDependentCommand extends Command {
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
    holder.removeDependent(dependent)
    Storage.getInstance().updateCustomer(holder)

    this.output.clear()
    this.output.success(`Cliente dependente ${dependent.name} deletado do sistema`)
  }
}
