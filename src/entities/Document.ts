import { DocumentType } from '@/enums/DocumentType'
import { Entity } from './Entity'

type DocumentProps = {
  number: string
  type: DocumentType
  expeditionDate: Date
}
export class Document extends Entity<DocumentProps> {
  get number(): string {
    return this.props.number
  }

  set number(number: string) {
    this.props.number = number
  }

  get type(): DocumentType {
    return this.props.type
  }

  set type(type: DocumentType) {
    this.props.type = type
  }

  get expeditionDate(): Date {
    return this.props.expeditionDate
  }

  set expeditionDate(expeditionDate: Date) {
    this.props.expeditionDate = expeditionDate
  }

  get formattedNumber(): string {
    switch (this.type) {
      case DocumentType.RG:
        return `RG: ${this.number.slice(0, 2)}.${this.number.slice(3, 6)}.${this.number.slice(6, 9)}-${this.number[8]}`
      case DocumentType.CPF:
        return `CPF: ${this.number.slice(0, 3)}.${this.number.slice(3, 6)}.${this.number.slice(6, 9)}-${this.number.slice(9)}`
      case DocumentType.PASSAPORTE:
        return `Passaporte: ${this.number.slice(0, 3)}.${this.number.slice(3, 6)}.${this.number.slice(6, 9)}-${this.number.slice(9)}`
      default:
        return this.number
    }
  }
}
