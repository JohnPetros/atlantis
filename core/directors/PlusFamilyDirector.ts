import { AccomodationBuilder } from 'core/builders/AccomodationBuilder'
import type { Accommodation } from 'core/entities/Accommodation'
import { Director } from './Director'

export class PlusFamilyDirector extends Director<Accommodation> {
  constructor() {
    super()
    this.builder = new AccomodationBuilder()
  }

  build(): Accommodation {
    const accommodation = this.builder as AccomodationBuilder
    return accommodation
      .setAccomodationName('Família Mais')
      .setSingleBeds(5)
      .setCoupleBeds(1)
      .setSuites(2)
      .setGarages(2)
      .setHasAirConditioning(true)
      .setMaxHostingsCount(22)
      .build()
  }
}
