import type { CellphoneDto } from 'core/dtos'

export class CellphoneFormatter {
  static format(cellphone: CellphoneDto): string {
    return `(${cellphone.ddd}) ${cellphone.number}`
  }
}
