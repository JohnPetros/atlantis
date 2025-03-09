import { CustomerRegisteringTypeMenu } from '@/menus/CustomerRegisteringTypeMenu'
import { Command } from './Command'
import { ListHoldersCommand } from './ListHoldersCommand'
import { CustomerListingTypeMenu } from '@/menus/CustomerListingTypeMenu'
import { ListDependentsCommand } from './ListDependentsCommands'
import { ListDependentHolderCommand } from './ListDependentHolderCommand'

export class HandleCustomerListingCommand extends Command {
  constructor() {
    super()
    this.menu = new CustomerListingTypeMenu(this.input)
  }

  async execute() {
    this.output.clear()
    while (this.isExecuting) {
      const option = await this.menu.display()
      switch (option) {
        case 'holders':
          this.subcommand = new ListHoldersCommand()
          break
        case 'dependents':
          this.subcommand = new ListDependentsCommand()
          break
        case 'dependent-holder':
          this.subcommand = new ListDependentHolderCommand()
          break
        case 'back':
          this.isExecuting = false
          this.output.clear()
          return
        default:
          this.output.error('Commando não entendido :(')
          continue
      }

      await this.subcommand.execute()
    }
  }
}
