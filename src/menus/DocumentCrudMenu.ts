import type { Input } from '@/interfaces/Input'
import type { Menu } from '@/interfaces/Menu'

export class DocumentCrudMenu implements Menu {
  constructor(private input: Input) {}

  async display(): Promise<string> {
    return await this.input.select('Escolha uma das opções:', [
      ['Editar um documento', 'edit'],
      ['Adicionar um documento', 'register'],
      ['Remover um documento', 'remove'],
    ])
  }
}
