import { AccomodationBuilder } from 'core/builders/AccomodationBuilder'
import type { Accommodation } from 'core/entities/Accommodation'
import { Director } from './Director'

export class SimpleCupleDirector extends Director<Accommodation> {
  constructor() {
    super()
    this.builder = new AccomodationBuilder()
  }

  build(): Accommodation {
    const accommodation = this.builder as AccomodationBuilder
    return accommodation
      .setAccomodationName('Casal Simples')
      .setSingleBeds(0)
      .setCoupleBeds(1)
      .setGarages(1)
      .setSuites(1)
      .setHasAirConditioning(true)
      .setMaxHostingsCount(32)
      .build()
  }
}
