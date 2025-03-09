import type { Address } from '@/entities/Address'
import type { Input } from '@/interfaces/Input'
import type { Menu } from '@/interfaces/Menu'

export class AddressEditingMenu implements Menu {
  constructor(
    private input: Input,
    private address: Address,
  ) {}

  async display(): Promise<string> {
    return await this.input.select('Qual valor do endereço você quer atualizar?', [
      [`Rua (${this.address.street})`, 'street'],
      [`Bairro (${this.address.neighborhood})`, 'neighborhood'],
      [`Cidade (${this.address.city})`, 'city'],
      [`Estado (${this.address.state})`, 'state'],
      [`País (${this.address.country})`, 'country'],
      [`CEP (${this.address.zipcode})`, 'zipcode'],
    ])
  }
}
