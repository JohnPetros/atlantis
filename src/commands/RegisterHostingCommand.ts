import { Hosting } from '@/entities/Hosting'
import { Command } from './Command'
import { SelectAccommodationCommand } from './SelectAccomodationCommand'
import { SelectCustomerCommand } from './SelectCustomerCommand'
import { Storage } from '@/utils/Storage'

export class RegisterHostingCommand extends Command {
  async execute() {
    const customer = await this.selectCustomer()
    if (customer.isHosted) {
      this.output.error('Cliente já está hospedado')
      return
    }
    const accomodation = await this.selectAccomodation()

    const hosting = new Hosting({
      accommodationName: accomodation.accomodationName,
      hostId: customer.id,
      hostName: customer.name,
      hostDocuments: customer.documents,
      hostDependents: customer.dependents.length,
    })
    customer.isHosted = true

    const storage = Storage.getInstance()
    storage.addHosting(hosting)
    storage.updateCustomer(customer)
    this.output.success('Hospedagem registrada')
  }

  private async selectCustomer() {
    this.output.title('Selecione um cliente para registrar a hospedagem')
    const subcommand = new SelectCustomerCommand(
      Storage.getInstance().customers,
      'cliente',
    )
    return await subcommand.execute()
  }

  private async selectAccomodation() {
    this.output.title('Selecione um tipo de acomodação para registrar a hospedagem')
    const subcommand = new SelectAccommodationCommand()
    return await subcommand.execute()
  }
}
