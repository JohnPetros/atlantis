import { DocumentType } from '@/enums/DocumentType'
import type { Input } from '@/interfaces/Input'
import type { Menu } from '@/interfaces/Menu'

export class DocumentTypeMenu implements Menu {
  constructor(private input: Input) {}

  async display(): Promise<string> {
    return await this.input.select('Qual o tipo do documento?', [
      ['Cadastro de Pessoas Física', DocumentType.CPF],
      ['Registro Geral', DocumentType.RG],
      ['Passaporte', DocumentType.PASSAPORTE],
      ['Finalizar cadastro de documentos', 'exit'],
    ])
  }
}
