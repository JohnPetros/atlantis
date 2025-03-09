import type { Input } from '@/interfaces/Input'
import type { Menu } from '@/interfaces/Menu'

export class MainMenu implements Menu {
  constructor(private input: Input) {}

  async display() {
    return await this.input.select('Por favor selecione', [
      ['Cadastrar clientes', 'register-customer'],
      ['Listar clientes', 'list-customers'],
      ['Editar cliente', 'edit-customer'],
      ['Remover cliente', 'remove-customer'],
      ['Sair', 'exit'],
    ])
  }
}
