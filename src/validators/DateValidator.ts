import type { Output } from '@/interfaces/Output'
import type { Validator } from '@/interfaces/Validator'

export class DateValidator implements Validator {
  constructor(private output: Output) {}

  validate(date: string): boolean {
    // Verifica o formato dd/mm/yyyy usando regex
    const dateFormatRegex = /^\d{2}\/\d{2}\/\d{4}$/
    if (!dateFormatRegex.test(date)) {
      this.output.error('Data deve estar no formato dd/mm/yyyy')
      return false
    }

    const parts = date.split('/')
    const day = parseInt(parts[0], 10)
    const month = parseInt(parts[1], 10)
    const year = parseInt(parts[2], 10)

    // Verifica se o mês é válido
    if (month < 1 || month > 12) {
      this.output.error('Mês deve estar entre 01 e 12')
      return false
    }

    // Verifica se o dia é válido
    if (day < 1 || day > 31) {
      this.output.error('Dia deve estar entre 01 e 31')
      return false
    }

    // Verifica se o ano é razoável (não muito antigo nem muito futuro)
    const currentYear = new Date().getFullYear()
    if (year < 1900 || year > currentYear + 100) {
      this.output.error(`Ano deve estar entre 1900 e ${currentYear + 100}`)
      return false
    }

    // Verifica se a data é válida usando o construtor Date
    const dateObj = new Date(year, month - 1, day)
    if (
      dateObj.getDate() !== day ||
      dateObj.getMonth() !== month - 1 ||
      dateObj.getFullYear() !== year
    ) {
      this.output.error('Data inválida')
      return false
    }

    return true
  }
}
