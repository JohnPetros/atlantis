import type { Input } from '@/interfaces/Input'
import type { Menu } from '@/interfaces/Menu'

export class CustomerEditingTypeMenu implements Menu {
  constructor(private input: Input) {}

  async display(): Promise<string> {
    return await this.input.select('Qual o tipo do cliente para edição?', [
      ['Titular', 'holder'],
      ['Dependente', 'dependent'],
      ['Voltar', 'back'],
    ])
  }
}
