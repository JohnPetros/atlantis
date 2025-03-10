import type { Input } from '@/interfaces/Input'
import type { Menu } from '@/interfaces/Menu'

export class AccommodationsManagementMenu implements Menu {
  constructor(private input: Input) {}

  async display() {
    return await this.input.select('Por favor selecione uma opção:', [
      ['Listar acomodações', 'list-accommodations'],
      ['Listar hospedagens', 'list-hostings'],
      ['Registrar hospedagem', 'register-hostings'],
      ['Remover hospedagem', 'remove-hostings'],
      ['Voltar', 'back'],
    ])
  }
}
