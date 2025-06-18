import type { HostingDto } from '@atlantis/core/dtos'
import { prisma } from '../prisma'

export class HostingsRepository {
  async findAll(): Promise<HostingDto[]> {
    const hostings = await prisma.hosting.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        accommodation: true,
        host: {
          include: {
            address: true,
            cellphones: true,
            documents: true,
            dependents: true,
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
            dependents: true,
          },
        },
      },
    })

    return hosting ? this.mapToDto(hosting) : null
  }

  async add(hostingDto: HostingDto): Promise<void> {
    await prisma.hosting.create({
      data: {
        accommodationId: hostingDto.accomodationId,
        hostId: hostingDto.hostId,
      },
    })
  }

  async update(hostingDto: HostingDto): Promise<void> {
    await prisma.hosting.update({
      where: { id: hostingDto.id },
      data: {
        accommodationId: hostingDto.accomodationId,
        hostId: hostingDto.hostId,
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
      accomodationName: hosting.accommodation.name,
      hostId: hosting.hostId,
      hostName: hosting.host.name,
      hostDocuments: hosting.host.documents.map((hostingDocument: any) => ({
        id: hostingDocument.id,
        number: hostingDocument.number,
        type: hostingDocument.type,
        expeditionDate: hostingDocument.expeditionDate.toISOString(),
      })),
      hostDependentsCount: hosting.host.dependents.length,
    }
  }
}
