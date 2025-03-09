import { Cellphone } from '@/entities/Cellphone'
import { fakerPT_BR as faker } from '@faker-js/faker'

export class CellPhonesFaker {
  static fake() {
    return new Cellphone({
      ddd: faker.number.int({ min: 10, max: 99 }).toString(),
      number: faker.number.int({ min: 100000000, max: 999999999 }).toString(),
    })
  }

  static fakeMany(count: number) {
    return Array.from({ length: count }).map(() => CellPhonesFaker.fake())
  }
}
