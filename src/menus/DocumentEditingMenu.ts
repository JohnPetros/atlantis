import type { Document } from '@/entities/Document'
import type { Input } from '@/interfaces/Input'
import type { Menu } from '@/interfaces/Menu'

export class DocumentEditingMenu implements Menu {
  constructor(
    private input: Input,
    private document: Document,
  ) {}

  async display(): Promise<string> {
    return await this.input.select('Qual valor do documento você quer atualizar?', [
      [`número (${this.document.number})`, 'number'],
      ['Data de expedição', 'expeditionDate'],
    ])
  }
}
