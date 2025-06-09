import { AccomodationBuilder } from 'core/builders/AccomodationBuilder'
import type { Accommodation } from 'core/entities/Accommodation'
import { Director } from './Director'

export class PlusSingleDirector extends Director<Accommodation> {
  constructor() {
    super()
    this.builder = new AccomodationBuilder()
  }

  build(): Accommodation {
    const accommodation = this.builder as AccomodationBuilder
    return accommodation
      .setAccomodationName('Solteiro Mais')
      .setSingleBeds(0)
      .setCoupleBeds(1)
      .setSuites(1)
      .setGarages(1)
      .setHasAirConditioning(true)
      .build()
  }
}
