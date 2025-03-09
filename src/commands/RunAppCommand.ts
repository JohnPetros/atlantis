import { MainMenu } from '@/menus/MainMenu'
import { Command } from './Command'
import { HandleCustomerRegisteringCommand } from './HandleCustomerRegisteringCommand'
import { HandleCustomerListingCommand } from './HandleCustomerListingCommand'
import { HandleCustomerRemovingCommand } from './HandleCustomerRemovingCommand'
import { HandleCustomerEditingCommand } from './HandleCustomerEditingCommand'

export class RunAppCommand extends Command {
  constructor() {
    super()
    this.isExecuting = true
    this.menu = new MainMenu(this.input)
  }

  async execute(): Promise<void> {
    this.output.title(
      'Bem-vindo(a) ao melhor sistema de gestão de clubes, hotéis e resorts do mundo, o Atlantis :)',
    )

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
        case 'exit': {
          this.isExecuting = false
          this.output.success('Até a próxima')
          return
        }
        default:
          this.output.error('Comando não entendido :(')
          continue
      }

      await this.subcommand.execute()
    }
  }
}
