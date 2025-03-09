import { Command } from './Command'
import type { Address } from '@/entities/Address'
import type { Customer } from '@/entities/Customer'
import { AddressZipcodeValidator } from '@/validators/AddressZipcodeValidator'
import { AddressEditingMenu } from '@/menus/AddressEditingMenu'

export class EditAddressCommand extends Command {
  constructor(private customer: Customer) {
    super()
  }

  async execute() {
    this.output.clear()
    this.output.title('Selecione um telefone para editar')
    this.menu = new AddressEditingMenu(this.input, this.customer.address)
    const option = await this.menu.display()

    switch (option) {
      case 'street':
        await this.editStreet(this.customer.address)
        break
      case 'neighborhood':
        await this.editNeighborhood(this.customer.address)
        break
      case 'city':
        await this.editCity(this.customer.address)
        break
      case 'state':
        await this.editState(this.customer.address)
        break
      case 'country':
        await this.editCountry(this.customer.address)
        break
      case 'zipcode':
        await this.editZipcode(this.customer.address)
        break
    }

    this.customer.updateDependentsAddress()
    this.output.success('Endereço atualizado')
  }

  private async editStreet(address: Address) {
    const street = await this.input.text('Qual a nova rua?')
    address.street = street
  }

  private async editNeighborhood(address: Address) {
    const neighborhood = await this.input.text('Qual a novo bairro?')
    address.neighborhood = neighborhood
  }

  private async editCity(address: Address) {
    const city = await this.input.text('Qual a nova cidade?')
    address.city = city
  }

  private async editState(address: Address) {
    const state = await this.input.text('Qual a novo  estado?')
    address.state = state
  }

  private async editCountry(address: Address) {
    const country = await this.input.text('Qual a novo país?')
    address.country = country
  }

  private async editZipcode(address: Address) {
    const validator = new AddressZipcodeValidator(this.output)
    let zipcode = ''
    do {
      zipcode = await this.input.text('Qual o novo zipcode?')
    } while (!validator.validate(zipcode))
    address.zipcode = zipcode
  }
}
