import { AccomodationBuilder } from '../builders/AccomodationBuilder'
import type { Accommodation } from '../entities/Accommodation'
import { Director } from './Director'

export class SuperFamilyDirector extends Director<Accommodation> {
  constructor() {
    super()
    this.builder = new AccomodationBuilder()
  }

  build(): Accommodation {
    const accommodation = this.builder as AccomodationBuilder
    return accommodation
      .setName('Família Super')
      .setSingleBeds(6)
      .setCoupleBeds(2)
      .setGarages(2)
      .setSuites(3)
      .setHasAirConditioning(true)
      .build()
  }
}
