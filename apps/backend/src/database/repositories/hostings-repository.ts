import type { HostingDto } from '@atlantis/core/dtos'
import { Hosting } from '@atlantis/core/entities'
import { prisma } from '../prisma.js'

export class HostingsRepository {
  async findAll(): Promise<HostingDto[]> {
    const hostings = await prisma.hosting.findMany({
      include: {
        accommodation: true,
        host: {
          include: {
            address: true,
            cellphones: true,
            documents: true,
          },
        },
        hostDocuments: {
          include: {
            document: true,
          },
        },
      },
    })

    return hostings.map(this.mapToDto)
  }

  async findById(id: string): Promise<HostingDto | null> {
    const hosting = await prisma.hosting.findUnique({
      where: { id },
      include: {
        accommodation: true,
        host: {
          include: {
            address: true,
            cellphones: true,
            documents: true,
          },
        },
        hostDocuments: {
          include: {
            document: true,
          },
        },
      },
    })

    return hosting ? this.mapToDto(hosting) : null
  }

  async add(hostingDto: HostingDto): Promise<void> {
    const hosting = Hosting.create(hostingDto)

    await prisma.hosting.create({
      data: {
        id: hosting.id,
        accommodationId: hosting.accomodationId,
        accommodationName: hosting.accomodationName,
        hostId: hosting.hostId,
        hostName: hosting.hostName,
        hostDependentsCount: hosting.hostDependentsCount,
        hostDocuments: {
          create: hosting.hostDocuments.map((document: any) => ({
            documentId: document.id,
          })),
        },
      },
    })
  }

  async update(hostingDto: HostingDto): Promise<void> {
    const hosting = Hosting.create(hostingDto)

    await prisma.hosting.update({
      where: { id: hosting.id },
      data: {
        accommodationId: hosting.accomodationId,
        accommodationName: hosting.accomodationName,
        hostId: hosting.hostId,
        hostName: hosting.hostName,
        hostDependentsCount: hosting.hostDependentsCount,
        hostDocuments: {
          deleteMany: {},
          create: hosting.hostDocuments.map((document: any) => ({
            documentId: document.id,
          })),
        },
      },
    })
  }

  async remove(id: string): Promise<void> {
    await prisma.hosting.delete({
      where: { id },
    })
  }

  private mapToDto(hosting: any): HostingDto {
    return {
      id: hosting.id,
      accomodationId: hosting.accommodationId,
      accomodationName: hosting.accommodationName,
      hostId: hosting.hostId,
      hostName: hosting.hostName,
      hostDocuments: hosting.hostDocuments.map((hostingDocument: any) => ({
        id: hostingDocument.document.id,
        number: hostingDocument.document.number,
        type: hostingDocument.document.type,
        expeditionDate: hostingDocument.document.expeditionDate.toISOString(),
      })),
      hostDependentsCount: hosting.hostDependentsCount,
    }
  }
}
