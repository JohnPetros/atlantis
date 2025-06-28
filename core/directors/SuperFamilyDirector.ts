import { AccomodationBuilder } from 'core/builders/AccomodationBuilder'
import type { Accommodation } from 'core/entities/Accommodation'
import { Director } from './Director'

export class SuperFamilyDirector extends Director<Accommodation> {
  constructor() {
    super()
    this.builder = new AccomodationBuilder()
  }

  build(): Accommodation {
    const accommodation = this.builder as AccomodationBuilder
    return accommodation
      .setAccomodationName('Família Super')
      .setSingleBeds(6)
      .setCoupleBeds(2)
      .setGarages(2)
      .setSuites(3)
      .setHasAirConditioning(true)
      .setMaxHostingsCount(10)
      .build()
  }
}
