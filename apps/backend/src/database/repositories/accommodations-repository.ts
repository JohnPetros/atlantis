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
import { prisma } from '../prisma.js'

export class AccommodationsRepository {
  constructor() {
    this.seed()
  }

  async findAll(): Promise<AccommodationDto[]> {
    const accommodations = await prisma.accommodation.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })
    return accommodations.map(this.mapToDto)
  }

  async findById(id: string): Promise<AccommodationDto | null> {
    const accommodation = await prisma.accommodation.findUnique({
      where: { id },
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
        hasAirConditioning: accommodation.hasAirConditioning,
      },
    })
  }

  async update(accommodationDto: AccommodationDto): Promise<void> {
    const accommodation = Accommodation.create(accommodationDto)

    await prisma.accommodation.update({
      where: { id: accommodation.id },
      data: {
        name: accommodation.name,
        singleBeds: accommodation.singleBeds,
        coupleBeds: accommodation.coupleBeds,
        suites: accommodation.suites,
        garages: accommodation.garages,
        hasAirConditioning: accommodation.hasAirConditioning,
      },
    })
  }

  async remove(id: string): Promise<void> {
    await prisma.accommodation.delete({
      where: { id },
    })
  }

  private async seed(): Promise<void> {
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

      for (const accommodationDto of seedAccommodations) {
        await this.add(accommodationDto)
      }
    }
  }

  private mapToDto(accommodation: any): AccommodationDto {
    return {
      id: accommodation.id,
      name: accommodation.accommodationName,
      singleBeds: accommodation.singleBeds,
      coupleBeds: accommodation.coupleBeds,
      suites: accommodation.suites,
      garages: accommodation.garages,
      hasAirConditioning: accommodation.hasAirConditioning,
    }
  }
}
