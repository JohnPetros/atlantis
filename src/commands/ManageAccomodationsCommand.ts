import { Command } from './Command'
import { CustomersManagementMenu } from '@/menus/CustomersManagementMenu'
import { ListAccommodationsCommand } from './ListAccomodationsCommand'
import { ListHostingsCommand } from './ListHostingsCommand'
import { RegisterHostingCommand } from './RegisterHostingCommand'
import { RemoveHostingCommand } from './RemoveHostingCommand'
import { AccommodationsManagementMenu } from '@/menus/AccommodationsManagementMenu'

export class ManageAccomodationsCommand extends Command {
  constructor() {
    super()
    this.isExecuting = true
    this.menu = new AccommodationsManagementMenu(this.input)
  }

  async execute(): Promise<void> {
    this.output.title('Gestão de acomodações')

    while (this.isExecuting) {
      const option = await this.menu.display()
      switch (option) {
        case 'list-accommodations':
          this.subcommand = new ListAccommodationsCommand()
          break
        case 'list-hostings':
          this.subcommand = new ListHostingsCommand()
          break
        case 'register-hostings':
          this.subcommand = new RegisterHostingCommand()
          break
        case 'remove-hostings':
          this.subcommand = new RemoveHostingCommand()
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
