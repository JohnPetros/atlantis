import { Command } from './Command'
import { ListHoldersCommand } from './ListHoldersCommand'
import { ListDependentsCommand } from './ListDependentsCommands'
import { CustomerRemovingTypeMenu } from '@/menus/CustomerRemovingTypeMenu'
import { RemoveHolderCommand } from './RemoveCustomerCommand'
import { RemoveDependentCommand } from './RemoveDependentCommand'

export class HandleCustomerRemovingCommand extends Command {
  constructor() {
    super()
    this.menu = new CustomerRemovingTypeMenu(this.input)
  }

  async execute() {
    this.output.clear()
    while (this.isExecuting) {
      const option = await this.menu.display()
      switch (option) {
        case 'holder': {
          this.subcommand = new RemoveHolderCommand()
          break
        }
        case 'dependent': {
          this.subcommand = new RemoveDependentCommand()
          break
        }
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
