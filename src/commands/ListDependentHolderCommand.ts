import type { Customer } from '@/entities/Customer'
import { Storage } from '@/utils/Storage'
import { Command } from './Command'
import { ListCustomersCommand } from './ListCustomersCommand'
import { SelectCustomerCommand } from './SelectCustomerCommand'

export class ListDependentHolderCommand extends Command {
  private holders: Customer[]

  constructor() {
    super()
    this.holders = Storage.getInstance().customers
    this.subcommand = new ListCustomersCommand(this.holders)
  }
  async execute() {
    if (!this.holders.length) {
      this.output.error('Nenhum cliente encontrado')
      return
    }
    const allDependents: Customer[] = []
    for (const holder of this.holders) {
      for (const dependent of holder.dependents) {
        allDependents.push(dependent)
      }
    }
    const subcommand = new SelectCustomerCommand(allDependents, 'dependente')
    const dependent = await subcommand.execute()
    const holder = this.holders.find((holder) => holder.hasDependent(dependent))

    if (holder) this.subcommand = new ListCustomersCommand([holder])
    await this.subcommand.execute()
  }
}
