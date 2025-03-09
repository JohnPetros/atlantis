import type { Input } from '@/interfaces/Input'
import type { Menu } from '@/interfaces/Menu'

export class CellphoneEditingMenu implements Menu {
  constructor(private input: Input) {}

  async display(): Promise<string> {
    return await this.input.select('Qual valor do telefone você quer atualizar?', [
      ['DDD', 'ddd'],
      ['Número', 'number'],
    ])
  }
}
