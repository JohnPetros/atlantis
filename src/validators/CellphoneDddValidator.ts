import type { Output } from '@/interfaces/Output'
import type { Validator } from '@/interfaces/Validator'

export class CellphoneDddValidator implements Validator {
  constructor(private output: Output) {}

  validate(ddd: string) {
    if (Number.isNaN(Number(ddd)) || ddd.length !== 2) {
      this.output.error('DDD deve conter 2 dígitos numéricos')
      return false
    }
    return true
  }
}
