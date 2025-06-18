import { Entity } from './Entity'
import type { DocumentType } from '../enums/DocumentType'
import type { DocumentDto } from '../dtos'

type DocumentProps = {
  number: string
  type: DocumentType
  expeditionDate: Date
}
export class Document extends Entity<DocumentProps> {
  static create(dto: DocumentDto) {
    return new Document(
      {
        number: dto.number,
        type: dto.type as DocumentType,
        expeditionDate: new Date(dto.expeditionDate),
      },
      dto.id,
    )
  }

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

  get dto(): DocumentDto {
    return {
      number: this.number,
      type: this.type,
      expeditionDate: this.expeditionDate.toISOString(),
    }
  }
}
