import type { Output } from '@/interfaces/Output'
import type { Validator } from '@/interfaces/Validator'

export class CellphoneNumberValidator implements Validator {
  constructor(private output: Output) {}

  validate(number: string) {
    if (Number.isNaN(Number(number)) || number.length !== 9) {
      this.output.error('Número deve conter 9 dígitos numéricos')
      return false
    }
    return true
  }
}
