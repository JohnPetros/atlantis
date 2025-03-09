import { CellphoneSelctingMenu } from '@/menus/CellphoneSelectingMenu'
import { Command } from './Command'
import { CellphoneCrudMenu } from '@/menus/CellphoneCrudMenu'
import type { Customer } from '@/entities/Customer'
import type { Cellphone } from '@/entities/Cellphone'
import { CellphoneEditingMenu } from '@/menus/CellphoneEditingMenu'
import { CellphoneDddValidator } from '@/validators/CellphoneDddValidator'
import { CellphoneNumberValidator } from '@/validators/CellphoneNumberValidator'
import { RegisterCellphonesCommand } from './RegisterCellphoneCommand'

export class EditCellphoneCommand extends Command {
  constructor(private customer: Customer) {
    super()
    this.menu = new CellphoneCrudMenu(this.input)
  }

  async execute() {
    this.output.clear()

    while (this.isExecuting) {
      this.menu = new CellphoneCrudMenu(this.input)
      const option = await this.menu.display()
      switch (option) {
        case 'edit':
          await this.editCellphone()
          break
        case 'register':
          await this.registerCellphone()
          break
        case 'remove':
          await this.removeCellphone()
          break
      }
    }

    this.customer.updateDependentsCellphones()
    this.output.success('Telefone(s) atualizado')
  }

  private async selectCellphone() {
    this.menu = new CellphoneSelctingMenu(this.input, this.customer.cellphones)
    const option = await this.menu.display()
    return this.customer.cellphones.find((_, index) => index + 1 === Number(option))
  }

  private async registerCellphone() {
    this.subcommand = new RegisterCellphonesCommand(this.customer)
    await this.subcommand.execute()
    this.isExecuting = false
  }

  private async removeCellphone() {
    const cellphone = await this.selectCellphone()
    if (cellphone) this.customer.removeCellphone(cellphone)
    this.isExecuting = false
  }

  private async editCellphone() {
    const cellphone = await this.selectCellphone()
    this.menu = new CellphoneEditingMenu(this.input)
    const option = await this.menu.display()

    if (cellphone)
      switch (option) {
        case 'ddd':
          await this.editDdd(cellphone)
          break
        case 'number':
          await this.editNumber(cellphone)
          break
      }
  }

  private async editDdd(cellphone: Cellphone) {
    const validator = new CellphoneDddValidator(this.output)
    let ddd = ''
    do {
      ddd = await this.input.text('Qual o novo DDD?')
    } while (!validator.validate(ddd))
    cellphone.ddd = ddd
    this.isExecuting = false
  }

  private async editNumber(cellphone: Cellphone) {
    const validator = new CellphoneNumberValidator(this.output)
    let number = ''
    do {
      number = await this.input.text('Qual o novo número?')
    } while (!validator.validate(number))

    if (this.customer.hasCellphone(number)) {
      this.output.error(`Telefone com o número ${number} já cadastrado para essa cliente`)
      return
    }

    cellphone.number = number
    this.isExecuting = false
  }
}
