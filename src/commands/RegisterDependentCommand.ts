import { Customer } from '@/entities/Customer'
import { Storage } from '@/utils/Storage'
import { Command } from './Command'
import { RegisterDocumentsCommand } from './RegisterDocumentsCommand'
import { RegisterAddressCommand } from './RegisterAddressCommand'
import { SelectCustomerCommand } from './SelectCustomerCommand'
import { RegisterCellphonesCommand } from './RegisterCellphoneCommand'

export class RegisterDependentCommand extends Command {
  async execute() {
    const subcommand = new SelectCustomerCommand(
      Storage.getInstance().customers,
      'titular',
    )
    const holder = await subcommand.execute()

    const name = await this.input.text('Qual o nome do dependente?')
    const socialName = await this.input.text('Qual o nome social do dependente?')
    const birthDate = await this.input.date(
      'Qual a data de nascimento do dependente?',
      this.output,
    )
    const dependent = new Customer({
      name,
      socialName,
      birthDate,
      address: holder.address.clone(),
      cellphones: holder.cellphones.map((cellphone) => cellphone.clone()),
      documents: [],
      dependents: [],
      registrationDate: new Date(),
    })

    this.subcommand = new RegisterDocumentsCommand(dependent)
    await this.subcommand.execute()

    holder.addDependent(dependent)
    Storage.getInstance().updateCustomer(holder)

    this.output.clear()
    this.output.success(`Finalizando o cadastro do dependente ${dependent.name}`)
  }
}
