import type { Output } from '@/interfaces/Output'
import type { Validator } from '@/interfaces/Validator'

export class AddressZipcodeValidator implements Validator {
  constructor(private output: Output) {}

  validate(zipcode: string) {
    if (Number.isNaN(Number(zipcode)) || zipcode.length !== 8) {
      this.output.error('CEP deve conter 8 dígitos numéricos')
      return false
    }
    return true
  }
}
