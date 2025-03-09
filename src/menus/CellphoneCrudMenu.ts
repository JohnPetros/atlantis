import type { Input } from '@/interfaces/Input'
import type { Menu } from '@/interfaces/Menu'

export class CellphoneCrudMenu implements Menu {
  constructor(private input: Input) {}

  async display(): Promise<string> {
    return await this.input.select('Escolha uma das opções:', [
      ['Editar um telefone', 'edit'],
      ['Adicionar um telefone', 'register'],
      ['Remover um telefone', 'remove'],
    ])
  }
}
