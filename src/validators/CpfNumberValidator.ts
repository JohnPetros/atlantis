import type { Output } from '@/interfaces/Output'
import type { Validator } from '@/interfaces/Validator'

export class CpfNumberValidator implements Validator {
  constructor(private output: Output) {}

  validate(number: string) {
    if (Number.isNaN(Number(number)) || number.length !== 11) {
      this.output.error('CPF deve conter 11 dígitos numéricos')
      return false
    }
    return true
  }
}
