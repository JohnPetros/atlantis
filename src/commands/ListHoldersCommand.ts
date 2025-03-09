import type { Customer } from '@/entities/Customer'
import { Storage } from '@/utils/Storage'
import { Command } from './Command'
import { ListCustomersCommand } from './ListCustomersCommand'

export class ListHoldersCommand extends Command {
  private holders: Customer[]

  constructor() {
    super()
    this.holders = Storage.getInstance().customers
    this.subcommand = new ListCustomersCommand(this.holders)
  }
  async execute() {
    if (!this.holders.length) {
      this.output.error('Nenhum cliente titular encontrado')
      return
    }
    this.output.title('Lista de clientes titulares')
    this.subcommand.execute()
  }
}
