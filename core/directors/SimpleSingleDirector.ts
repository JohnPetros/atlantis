import { AccomodationBuilder } from 'core/builders/AccomodationBuilder'
import type { Accommodation } from 'core/entities/Accommodation'
import { Director } from './Director'

export class SimpleSingleDirector extends Director<Accommodation> {
  constructor() {
    super()
    this.builder = new AccomodationBuilder()
  }

  build(): Accommodation {
    const accommodation = this.builder as AccomodationBuilder
    return accommodation
      .setAccomodationName('Solteiro Simples')
      .setSingleBeds(1)
      .setCoupleBeds(0)
      .setGarages(0)
      .setSuites(1)
      .setHasAirConditioning(true)
      .setMaxHostingsCount(40)
      .build()
  }
}
