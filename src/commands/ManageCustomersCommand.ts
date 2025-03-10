import { Command } from './Command'
import { HandleCustomerRegisteringCommand } from './HandleCustomerRegisteringCommand'
import { HandleCustomerListingCommand } from './HandleCustomerListingCommand'
import { HandleCustomerRemovingCommand } from './HandleCustomerRemovingCommand'
import { HandleCustomerEditingCommand } from './HandleCustomerEditingCommand'
import { CustomersManagementMenu } from '@/menus/CustomersManagementMenu'

export class ManageCustomersCommand extends Command {
  constructor() {
    super()
    this.isExecuting = true
    this.menu = new CustomersManagementMenu(this.input)
  }

  async execute(): Promise<void> {
    this.output.title('Gestão de clientes')

    while (this.isExecuting) {
      const option = await this.menu.display()
      switch (option) {
        case 'register-customer':
          this.subcommand = new HandleCustomerRegisteringCommand()
          break
        case 'list-customers':
          this.subcommand = new HandleCustomerListingCommand()
          break
        case 'edit-customer':
          this.subcommand = new HandleCustomerEditingCommand()
          break
        case 'remove-customer':
          this.subcommand = new HandleCustomerRemovingCommand()
          break
        case 'back':
          this.isExecuting = false
          this.output.clear()
          return
        default:
          this.output.error('Comando não entendido :(')
          continue
      }

      await this.subcommand.execute()
    }
  }
}
