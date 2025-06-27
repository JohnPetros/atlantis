import type { AccomodationName } from '@/enums/AccomodationName'
import { Entity } from './Entity'
import type { Document } from './Document'

type HostingProps = {
  accommodationName: AccomodationName
  hostId: string
  hostName: string
  hostDocuments: Document[]
  hostDependents: number
  startDate: Date
  endDate: Date
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

  get startDate(): Date {
    return this.props.startDate
  }

   get endDate(): Date {
    return this.props.endDate
  }
}
