import type { Document } from '@/entities/Document'
import type { Input } from '@/interfaces/Input'
import type { Menu } from '@/interfaces/Menu'

export class DocumentSelectingMenu implements Menu {
  constructor(
    private input: Input,
    private documents: Document[],
  ) {}

  async display(): Promise<string> {
    return await this.input.select(
      'Selection um documento?',
      this.documents.map((document, index) => [
        document.formattedNumber,
        String(index + 1),
      ]),
    )
  }
}
