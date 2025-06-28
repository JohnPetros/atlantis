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
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let startDate: Date
    do {
      startDate = await this.input.date('Data de início', this.output)
      if (startDate < today) {
        this.output.error('A data de início não pode ser anterior a hoje')
      }
    } while (startDate < today)

    let endDate: Date
    do {
      endDate = await this.input.date('Data de término', this.output)
      if (endDate < today) {
        this.output.error('A data de término não pode ser anterior a hoje')
      }
      if (endDate < startDate) {
        this.output.error('A data de término não pode ser anterior à data de início')
      }
    } while (endDate < today || endDate < startDate)

    const hosting = new Hosting({
      accommodationName: accomodation.accomodationName,
      hostId: customer.id,
      hostName: customer.name,
      hostDocuments: customer.documents,
      hostDependents: customer.dependents.length,
      startDate,
      endDate,
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
