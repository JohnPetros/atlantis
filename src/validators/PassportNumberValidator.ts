import type { Output } from '@/interfaces/Output'
import type { Validator } from '@/interfaces/Validator'

const PASSPORT_NUMBER_FORMAT_REGEX = /^[A-Z]\d{8}$/

export class PassportNumberValidator implements Validator {
  constructor(private output: Output) {}

  validate(number: string) {
    if (!PASSPORT_NUMBER_FORMAT_REGEX.test(number)) {
      this.output.error(
        'Número de passaporte deve conter 1 letra maiúscula seguida de 8 dígitos',
      )
      return false
    }
    return true
  }
}
