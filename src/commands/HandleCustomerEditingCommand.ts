import { CustomerEditingTypeMenu } from '@/menus/CustomerEditingTypeMenu'
import { Command } from './Command'
import { EditHolderCommand } from './EditHolderCommand'
import { EditDependentCommand } from './EditDependentCommand'

export class HandleCustomerEditingCommand extends Command {
  constructor() {
    super()
    this.menu = new CustomerEditingTypeMenu(this.input)
  }

  async execute() {
    this.output.clear()
    while (this.isExecuting) {
      const option = await this.menu.display()
      switch (option) {
        case 'holder': {
          this.subcommand = new EditHolderCommand()
          break
        }
        case 'dependent': {
          this.subcommand = new EditDependentCommand()
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
