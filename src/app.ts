import { RunAppCommand } from './commands/RunAppCommand'

export class App {
  async run(): Promise<void> {
    const runAppCommand = new RunAppCommand()
    runAppCommand.execute()
  }
}
