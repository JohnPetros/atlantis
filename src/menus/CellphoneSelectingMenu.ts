import type { Cellphone } from '@/entities/Cellphone'
import type { Input } from '@/interfaces/Input'
import type { Menu } from '@/interfaces/Menu'

export class CellphoneSelctingMenu implements Menu {
  constructor(
    private input: Input,
    private cellphones: Cellphone[],
  ) {}

  async display(): Promise<string> {
    return await this.input.select(
      'Qual telefone você quer atualizar?',
      this.cellphones.map((document, index) => [
        document.formattedValue,
        String(index + 1),
      ]),
    )
  }
}
