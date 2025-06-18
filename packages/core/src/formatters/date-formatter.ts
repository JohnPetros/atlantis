export class DateFormatter {
  static format(date: string): string {
    return new Date(date).toLocaleDateString('pt-BR')
  }
}
