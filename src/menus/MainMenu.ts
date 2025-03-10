import type { Input } from '@/interfaces/Input'
import type { Menu } from '@/interfaces/Menu'

export class MainMenu implements Menu {
  constructor(private input: Input) {}

  async display() {
    return await this.input.select('Por favor selecione', [
      ['Gestão de clientes', 'customers-management'],
      ['Gestão de acomodações', 'accomodations-management'],
      ['Sair', 'exit'],
    ])
  }
}
