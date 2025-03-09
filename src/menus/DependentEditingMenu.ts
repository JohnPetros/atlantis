import type { Input } from '@/interfaces/Input'
import type { Menu } from '@/interfaces/Menu'

export class DependentEditingMenu implements Menu {
  constructor(private input: Input) {}

  async display(): Promise<string> {
    return await this.input.select('Selecione um valor para editar', [
      ['Nome', 'name'],
      ['Nome social', 'socialName'],
      ['Data de nascimento', 'birthDate'],
      ['Documentos', 'documents'],
    ])
  }
}
