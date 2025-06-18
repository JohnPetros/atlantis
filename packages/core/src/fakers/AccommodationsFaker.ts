import { fakerPT_BR as faker } from '@faker-js/faker'

import type { AccommodationProps } from '../entities/Accommodation'
import { Accommodation } from '../entities/Accommodation'

export class AccommodationsFaker {
  static fake(props?: Partial<AccommodationProps>) {
    return new Accommodation({
      accommodationName: faker.person.firstName(),
      singleBeds: faker.number.int({ min: 1, max: 4 }),
      coupleBeds: faker.number.int({ min: 1, max: 2 }),
      suites: faker.number.int({ min: 1, max: 2 }),
      garages: faker.number.int({ min: 1, max: 2 }),
      hasAirConditioning: faker.datatype.boolean(),
      ...props,
    })
  }

  static fakeMany(count: number, props?: Partial<AccommodationProps>) {
    return count === 0
      ? []
      : Array.from({ length: count }).map(() => AccommodationsFaker.fake(props))
  }
}
