import { CustomerRegisteringTypeMenu } from '@/menus/CustomerRegisteringTypeMenu'
import { Command } from './Command'
import { RegisterHolderCommand } from './RegisterHolderCommand'

export class HandleCustomerRegisteringCommand extends Command {
  constructor() {
    super()
    this.menu = new CustomerRegisteringTypeMenu(this.input)
  }

  async execute() {
    const option = await this.menu.display()

    switch (option) {
      case 'holder': {
        this.subcommand = new RegisterHolderCommand()
        break
      }
      case 'dependent': {
        break
      }
      case 'back':
        this.isExecuting = false
        this.output.clear()
        return
      default:
        this.output.error('Commando não entendido :(')
    }

    await this.subcommand.execute()
  }
}
