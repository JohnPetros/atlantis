import type { Output } from './Output'

export interface Input {
  text(message: string): Promise<string>
  number(message: string): Promise<number>
  date(message: string, output: Output): Promise<Date>
  select(message: string, options: string[][]): Promise<string>
}
