import type { DocumentDto } from './document-dto'

export type HostingDto = {
  id?: string
  accomodationId: string
  accomodationName: string
  hostId: string
  hostName: string
  hostDocuments: DocumentDto[]
  hostDependentsCount: number
  startDate: string
  endDate: string
}
