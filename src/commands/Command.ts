import { ChalkOutput } from '@/libs/ChalkOutput'
import { InquirerInput } from '@/libs/InquirerInput'
import type { Input } from '@/interfaces/Input'
import type { Menu } from '@/interfaces/Menu'
import type { Output } from '@/interfaces/Output'

export abstract class Command<Response = void> {
  protected menu!: Menu
  protected input: Input
  protected output: Output
  protected subcommand!: Command
  protected isExecuting: boolean

  constructor() {
    this.input = new InquirerInput()
    this.output = new ChalkOutput()
    this.isExecuting = true
  }

  abstract execute(): Promise<Response>
}
