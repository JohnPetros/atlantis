import type { Output } from '@/interfaces/Output'
import type { Validator } from '@/interfaces/Validator'

export class RgNumberValidator implements Validator {
  constructor(private output: Output) {}

  validate(number: string) {
    if (Number.isNaN(Number(number)) || number.length !== 9) {
      this.output.error('RG deve conter 9 dígitos')
      return false
    }
    return true
  }
}
