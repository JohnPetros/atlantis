import { Customer } from '@/entities/Customer'
import { Command } from './Command'
import { RegisterDocumentsCommand } from './RegisterDocumentsCommand'
import { RegisterAddressCommand } from './RegisterAddressCommand'
import { Storage } from '@/utils/Storage'
import { RegisterCellphonesCommand } from './RegisterCellphoneCommand'

export class RegisterHolderCommand extends Command {
  async execute() {
    this.output.title('Iniciando o cadastro de um novo cliente')

    const name = await this.input.text('Qual o nome do novo cliente?')
    const socialName = await this.input.text('Qual o nome social do novo cliente?')
    const birthDate = await this.input.date('Qual a data de nascimento?', this.output)
    const holder = new Customer({
      name,
      socialName,
      birthDate,
      documents: [],
      cellphones: [],
      dependents: [],
      registrationDate: new Date(),
    })

    this.subcommand = new RegisterDocumentsCommand(holder)
    await this.subcommand.execute()

    this.subcommand = new RegisterAddressCommand(holder)
    await this.subcommand.execute()

    this.subcommand = new RegisterCellphonesCommand(holder)
    await this.subcommand.execute()

    const storage = Storage.getInstance()
    storage.customers.push(holder)

    this.output.clear()
    this.output.success(`Finalizando o cadastro do cliente ${holder.name}`)
  }
}
