import type { Input } from '@/interfaces/Input'
import type { Menu } from '@/interfaces/Menu'

export class CustomerRegisteringTypeMenu implements Menu {
  constructor(private input: Input) {}

  async display(): Promise<string> {
    return await this.input.select('Qual o tipo do cliente para cadastro?', [
      ['Titular', 'holder'],
      ['Dependente', 'dependent'],
      ['Voltar', 'back'],
    ])
  }
}
