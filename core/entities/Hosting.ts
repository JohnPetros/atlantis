import type { AccomodationName } from '@/enums/AccomodationName'
import { Entity } from './Entity'
import type { Document } from './Document'

type HostingProps = {
  accommodationName: AccomodationName
  hostId: string
  hostName: string
  hostDocuments: Document[]
  hostDependents: number
}

export class Hosting extends Entity<HostingProps> {
  get accomodationName(): AccomodationName {
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

  get hostDependents(): number {
    return this.props.hostDependents
  }
}
