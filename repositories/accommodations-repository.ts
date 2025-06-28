import {
  PlusFamilyDirector,
  PlusSingleDirector,
  SimpleCupleDirector,
  SimpleSingleDirector,
} from 'core/directors'
import { SuperFamilyDirector } from 'core/directors/SuperFamilyDirector'
import type { AccommodationDto, HostingDto } from 'core/dtos'

export const AccommodationsRepository = () => {
  const accommodations: AccommodationDto[] = []
  accommodations.push(new SuperFamilyDirector().build().dto)
  accommodations.push(new SimpleSingleDirector().build().dto)
  accommodations.push(new PlusSingleDirector().build().dto)
  accommodations.push(new SimpleCupleDirector().build().dto)
  accommodations.push(new PlusFamilyDirector().build().dto)

  return {
    async findAll(hostings: HostingDto[]) {
      return accommodations.map((accommodation) => {
        const hostingsCount = hostings.filter(
          (hosting) => hosting.accomodationId === accommodation.id,
        ).length

        return {
          ...accommodation,
          hostingsCount,
        }
      })
    },

    async findById(id: string) {
      const accommodation = accommodations.find(
        (accommodation) => accommodation.id === id,
      )
      if (!accommodation) return null

      return {
        ...accommodation,
        hostingsCount: 0,
      }
    },
  }
}
