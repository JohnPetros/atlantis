import type { DocumentType } from '@/enums/DocumentType'
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

  get type(): DocumentType {
    return this.props.type
  }

  get expeditionDate(): Date {
    return this.props.expeditionDate
  }
}
