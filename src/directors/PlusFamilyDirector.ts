import { AccomodationBuilder } from '@/builders/AccomodationBuilder'
import type { Accommodation } from '@/entities/Accommodation'
import { AccomodationName } from '@/enums/AccomodationName'
import { Director } from './Director'

export class PlusFamilyDirector extends Director<Accommodation> {
  constructor() {
    super()
    this.builder = new AccomodationBuilder()
  }

  build(): Accommodation {
    const accommodation = this.builder as AccomodationBuilder
    return accommodation
      .setAccomodationName(AccomodationName.PLUS_FAMILY)
      .setSingleBeds(5)
      .setCoupleBeds(1)
      .setSuites(2)
      .setGarages(2)
      .setHasAirConditioning(true)
      .build()
  }
}
