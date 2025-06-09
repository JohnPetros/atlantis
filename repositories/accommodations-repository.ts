import {
  PlusFamilyDirector,
  PlusSingleDirector,
  SimpleCupleDirector,
  SimpleSingleDirector,
} from 'core/directors'
import { SuperFamilyDirector } from 'core/directors/SuperFamilyDirector'
import type { AccommodationDto } from 'core/dtos'

export const AccommodationsRepository = () => {
  let accommodations: AccommodationDto[] = []
  accommodations.push(new SuperFamilyDirector().build().dto)
  accommodations.push(new SimpleSingleDirector().build().dto)
  accommodations.push(new PlusSingleDirector().build().dto)
  accommodations.push(new SimpleCupleDirector().build().dto)
  accommodations.push(new PlusFamilyDirector().build().dto)

  return {
    async findAll() {
      return accommodations
    },

    async findById(id: string) {
      return accommodations.find((accommodation) => accommodation.id === id)
    },

    async add(accommodation: AccommodationDto) {
      accommodations.unshift(accommodation)
    },

    async update(accommodation: AccommodationDto) {
      const index = accommodations.findIndex(
        (currentAccommodation) => currentAccommodation.id === accommodation.id,
      )
      accommodations[index] = accommodation
    },

    async remove(id: string) {
      accommodations = accommodations.filter((accommodation) => accommodation.id !== id)
    },
  }
}
