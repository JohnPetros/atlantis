import type { Input } from '@/interfaces/Input'
import type { Menu } from '@/interfaces/Menu'

export class CustomerListingTypeMenu implements Menu {
  constructor(private input: Input) {}

  async display(): Promise<string> {
    return await this.input.select('Qual o tipo de listagem desejada?', [
      ['Todos os titulares', 'holders'],
      ['Todos os dependentes de um titular específico', 'dependents'],
      ['Titular de um dependente específico', 'dependent-holder'],
      ['Voltar', 'back'],
    ])
  }
}
