import { input, select } from '@inquirer/prompts'
import type { Input } from '@/interfaces/Input'
import type { Output } from '@/interfaces/Output'
import { DateValidator } from '@/validators/DateValidator'

export class InquirerInput implements Input {
  async text(message: string): Promise<string> {
    return await input({ message })
  }

  async number(message: string): Promise<number> {
    return Number(await input({ message }))
  }

  async date(message: string, output: Output): Promise<Date> {
    const validator = new DateValidator(output)
    while (true) {
      const value = await input({ message: `${message}, no padrão dd/mm/yyyy:` })
      if (!validator.validate(value)) {
        continue
      }
      const parts = value.split('/')
      const year = new Number(parts[2])
      const month = new Number(parts[1])
      const day = new Number(parts[0])
      const date = new Date(year.valueOf(), month.valueOf() - 1, day.valueOf())
      return date
    }
  }

  async select(message: string, options: string[][]): Promise<string> {
    const answer = await select({
      message,
      choices: options.map((option) => ({
        name: option[0],
        value: option[1] ?? option[0],
      })),
    })

    return answer
  }
}
