import { AccomodationBuilder } from '../builders/AccomodationBuilder'
import type { Accommodation } from '../entities/Accommodation'
import { Director } from './Director'

export class SimpleFamilyDirector extends Director<Accommodation> {
  constructor() {
    super()
    this.builder = new AccomodationBuilder()
  }

  build(): Accommodation {
    const accommodation = this.builder as AccomodationBuilder
    return accommodation
      .setName('Família Simples')
      .setSingleBeds(2)
      .setCoupleBeds(1)
      .setGarages(1)
      .setSuites(1)
      .setHasAirConditioning(true)
      .setMaxHostingsCount(15)
      .build()
  }
}
