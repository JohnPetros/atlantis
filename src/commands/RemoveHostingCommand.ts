import { Command } from './Command'
import { Storage } from '@/utils/Storage'
import { ListHostingsCommand } from './ListHostingsCommand'

export class RemoveHostingCommand extends Command {
  private storage

  constructor() {
    super()
    this.subcommand = new ListHostingsCommand()
    this.storage = Storage.getInstance()
  }

  async execute() {
    if (!this.storage.hostings.length) {
      this.output.error('Nenhuma hospedagem registrada')
      return
    }
    this.output.title('Escolha uma hospedagem para remover')

    this.subcommand = new ListHostingsCommand()
    this.subcommand.execute()

    while (this.isExecuting) {
      const hostingId = await this.input.text('ID da hospedagem:')
      const hosting = this.storage.getHostingById(hostingId)
      if (!hosting) {
        this.output.error('Hospedagem não encontrada')
        return
      }

      const customer = this.storage.getCustomerById(hosting.hostId)
      if (customer) {
        customer.isHosted = false
        this.storage.updateCustomer(customer)
      }

      this.storage.deleteHosting(hosting)
      this.isExecuting = false
      this.output.clear()
      this.output.success('Hospedagem removida do sistema')
    }
  }
}
