import { prisma } from '../prisma'

import {
  PlusFamilyDirector,
  PlusSingleDirector,
  SimpleCupleDirector,
  SimpleSingleDirector,
  SuperFamilyDirector,
  SimpleFamilyDirector,
} from '@atlantis/core/directors'
import type { AccommodationDto } from '@atlantis/core/dtos'
import { Accommodation } from '@atlantis/core/entities'

export class AccommodationsRepository {
  async findAll(): Promise<AccommodationDto[]> {
    const accommodations = await prisma.accommodation.findMany({
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        hostings: true,
      },
    })
    return accommodations.map(this.mapToDto)
  }

  async findById(id: string): Promise<AccommodationDto | null> {
    const accommodation = await prisma.accommodation.findUnique({
      where: { id },
      include: {
        hostings: true,
      },
    })

    return accommodation ? this.mapToDto(accommodation) : null
  }

  async add(accommodationDto: AccommodationDto): Promise<void> {
    const accommodation = Accommodation.create(accommodationDto)

    await prisma.accommodation.create({
      data: {
        id: accommodation.id,
        name: accommodation.name,
        singleBeds: accommodation.singleBeds,
        coupleBeds: accommodation.coupleBeds,
        suites: accommodation.suites,
        garages: accommodation.garages,
        maxHostingsCount: accommodation.maxHostingsCount,
        hasAirConditioning: accommodation.hasAirConditioning,
      },
    })
  }

  async seed(): Promise<void> {
    const count = await prisma.accommodation.count()

    if (count === 0) {
      const seedAccommodations = [
        new SuperFamilyDirector().build().dto,
        new SimpleSingleDirector().build().dto,
        new PlusSingleDirector().build().dto,
        new SimpleCupleDirector().build().dto,
        new PlusFamilyDirector().build().dto,
        new SimpleFamilyDirector().build().dto,
      ]

      await Promise.all(
        seedAccommodations.map((accommodation) => this.add(accommodation)),
      )
    }
  }

  private mapToDto(accommodation: any): AccommodationDto {
    return {
      id: accommodation.id,
      name: accommodation.name,
      singleBeds: accommodation.singleBeds,
      coupleBeds: accommodation.coupleBeds,
      suites: accommodation.suites,
      garages: accommodation.garages,
      maxHostingsCount: accommodation.maxHostingsCount,
      hostingsCount: accommodation.hostings.length,
      hasAirConditioning: accommodation.hasAirConditioning,
    }
  }
}
