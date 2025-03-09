import { Command } from './Command'
import { Storage } from '@/utils/Storage'
import { SelectCustomerCommand } from './SelectCustomerCommand'

export class RemoveHolderCommand extends Command {
  async execute() {
    this.output.title('Escolha um cliente titular para deletar')
    const subcommand = new SelectCustomerCommand(
      Storage.getInstance().customers,
      'cliente',
    )
    const holder = await subcommand.execute()
    Storage.getInstance().deleteCustomer(holder)
    this.output.clear()
    this.output.success(`Cliente titular ${holder.name} deletado do sistema`)
  }
}
