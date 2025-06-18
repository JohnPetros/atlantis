import { Entity } from './Entity'
import { Document } from './Document'
import type { HostingDto } from '../dtos'

type HostingProps = {
  accomodationId: string
  accommodationName: string
  hostId: string
  hostName: string
  hostDocuments: Document[]
  hostDependentsCount: number
}

export class Hosting extends Entity<HostingProps> {
  static create(dto: HostingDto): Hosting {
    return new Hosting(
      {
        accomodationId: dto.accomodationId,
        accommodationName: dto.accomodationName,
        hostId: dto.hostId,
        hostName: dto.hostName,
        hostDocuments: dto.hostDocuments.map(Document.create),
        hostDependentsCount: dto.hostDependentsCount,
      },
      dto.id,
    )
  }

  get accomodationId(): string {
    return this.props.accomodationId
  }

  get accomodationName(): string {
    return this.props.accommodationName
  }

  get hostId(): string {
    return this.props.hostId
  }

  get hostName(): string {
    return this.props.hostName
  }

  get hostDocuments(): Document[] {
    return this.props.hostDocuments
  }

  get hostDependentsCount(): number {
    return this.props.hostDependentsCount
  }

  get dto(): HostingDto {
    return {
      id: this.id,
      accomodationId: this.accomodationId,
      accomodationName: this.accomodationName,
      hostId: this.hostId,
      hostName: this.hostName,
      hostDocuments: this.hostDocuments.map((document) => document.dto),
      hostDependentsCount: this.hostDependentsCount,
    }
  }
}
