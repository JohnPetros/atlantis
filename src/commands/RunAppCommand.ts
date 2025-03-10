import { MainMenu } from '@/menus/MainMenu'
import { Command } from './Command'
import { ManageCustomersCommand } from './ManageCustomersCommand'
import { ManageAccomodationsCommand } from './ManageAccomodationsCommand'

export class RunAppCommand extends Command {
  constructor() {
    super()
    this.isExecuting = true
    this.menu = new MainMenu(this.input)
  }

  async execute(): Promise<void> {
    this.output.clear()
    this.output.title(
      'Bem-vindo(a) ao melhor sistema de gestão de clubes, hotéis e resorts do mundo, o Atlantis :)',
    )

    while (this.isExecuting) {
      const option = await this.menu.display()
      switch (option) {
        case 'customers-management':
          this.subcommand = new ManageCustomersCommand()
          break
        case 'accomodations-management':
          this.subcommand = new ManageAccomodationsCommand()
          break
        case 'exit':
          this.isExecuting = false
          this.output.success('Até a próxima')
          continue
        default:
          this.output.error('Comando não entendido :(')
          continue
      }

      await this.subcommand.execute()
    }
  }
}
