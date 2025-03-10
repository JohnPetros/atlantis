import type { Output } from '@/interfaces/Output'
import type { Validator } from '@/interfaces/Validator'

export const DATE_REGEX = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/

export class DateValidator implements Validator {
  constructor(private output: Output) {}

  validate(date: string) {
    if (!DATE_REGEX.test(date)) {
      this.output.error('Data deve ser uma data válida e estar no formato (dd/mm/yyyy)')
      return false
    }
    return true
  }
}
