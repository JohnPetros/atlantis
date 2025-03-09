import type { Input } from '@/interfaces/Input'
import type { Menu } from '@/interfaces/Menu'

export class CustomerRemovingTypeMenu implements Menu {
  constructor(private input: Input) {}

  async display(): Promise<string> {
    return await this.input.select('Qual o tipo de listagem desejada?', [
      ['Remover titular', 'holder'],
      ['Remover dependente de um titular específico', 'dependent'],
      ['Voltar', 'back'],
    ])
  }
}
