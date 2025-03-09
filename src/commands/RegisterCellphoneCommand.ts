import type { Customer } from '@/entities/Customer'
import { Command } from './Command'
import { Cellphone } from '@/entities/Cellphone'
import { CellphoneNumberValidator } from '@/validators/CellphoneNumberValidator'
import { CellphoneDddValidator } from '@/validators/CellphoneDddValidator'

export class RegisterCellphonesCommand extends Command {
  constructor(private customer: Customer) {
    super()
  }

  async execute(): Promise<void> {
    this.output.title('Cadastrando telefones')
    const cellphonesCount = await this.input.number('Quantos telefones deseja adicionar?')

    for (let i = 0; i < cellphonesCount; i++)
      this.customer.addCellphone(await this.getCellphone())

    this.output.success('Cadastro de telefones finalizado')
  }

  private async getCellphone() {
    let ddd = ''
    while (true) {
      ddd = await this.input.text('Qual o DDD?')
      const validator = new CellphoneDddValidator(this.output)
      if (!validator.validate(ddd)) continue
      break
    }
    let number = ''
    while (true) {
      number = await this.input.text('Qual o número?')
      const validator = new CellphoneNumberValidator(this.output)
      if (!validator.validate(number)) continue
      break
    }
    return new Cellphone({ ddd, number })
  }

  private isNumberValid(number: string) {
    if (Number.isNaN(Number(number)) || number.length !== 2) {
      this.output.error('Number deve conter 2 dígitos numéricos')
      return false
    }
    return true
  }
}
