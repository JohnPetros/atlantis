import { AccomodationName } from '@/enums/AccomodationName'
import type { Input } from '@/interfaces/Input'
import type { Menu } from '@/interfaces/Menu'

export class AccommodationNameMenu implements Menu {
  constructor(private input: Input) {}

  async display() {
    return await this.input.select('Por favor selecione uma acomodação', [
      [AccomodationName.SIMPLE_SINGLE, AccomodationName.SIMPLE_SINGLE],
      [AccomodationName.SIMPLE_COUPLE, AccomodationName.SIMPLE_COUPLE],
      [AccomodationName.SIMPLE_FAMILY, AccomodationName.SIMPLE_FAMILY],
      [AccomodationName.PLUS_SINGLE, AccomodationName.PLUS_SINGLE],
      [AccomodationName.PLUS_FAMILY, AccomodationName.PLUS_FAMILY],
      [AccomodationName.SUPER_FAMILY, AccomodationName.SUPER_FAMILY],
      ['Voltar', 'back'],
    ])
  }
}
