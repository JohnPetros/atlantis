import { Address } from '@/entities/Address'
import { Command } from './Command'
import type { Customer } from '@/entities/Customer'

export class RegisterAddressCommand extends Command {
  constructor(private customer: Customer) {
    super()
  }

  async execute(): Promise<void> {
    this.output.title('Coletando dados de endereço')
    const street = await this.input.text('Qual a rua?')
    const neighborhood = await this.input.text('Qual o bairro?')
    const city = await this.input.text('Qual a cidade?')
    const state = await this.input.text('Qual o estado?')
    const country = await this.input.text('Qual o país?')

    let zipcode = ''
    while (true) {
      zipcode = await this.input.text('Qual o código postal?')
      if (!this.isZipcodeValid(zipcode)) continue
      break
    }

    const address = new Address({
      city,
      country,
      neighborhood,
      zipcode,
      state,
      street,
    })
    this.customer.address = address
  }

  private isZipcodeValid(zipcode: string) {
    if (Number.isNaN(Number(zipcode)) || zipcode.length !== 8) {
      this.output.error('CEP deve conter 8 dígitos numéricos')
      return false
    }
    return true
  }
}
