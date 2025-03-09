import { fakerPT_BR as faker } from '@faker-js/faker'

import { Address } from '@/entities/Address'
import { Customer, type CustomerProps } from '@/entities/Customer'
import { Document } from '@/entities/Document'
import { DocumentType } from '@/enums/DocumentType'
import { CellPhonesFaker } from './CellphonesFaker'

export class CustomersFaker {
  static fake(props?: Partial<CustomerProps>) {
    const fakeCpf = new Document({
      number: faker.number.int({ min: 10000000000, max: 99999999999 }).toString(),
      expeditionDate: faker.date.past(),
      type: DocumentType.CPF,
    })

    const fakeAddress = new Address({
      street: faker.location.streetAddress(),
      neighborhood: faker.location.secondaryAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      zipcode: faker.location.zipCode(),
    })

    const fakeCellphones = CellPhonesFaker.fakeMany(faker.number.int({ min: 1, max: 2 }))

    return new Customer({
      name: faker.person.firstName(),
      socialName: faker.person.lastName(),
      birthDate: faker.date.past(),
      registrationDate: new Date(),
      address: fakeAddress,
      documents: [fakeCpf],
      cellphones: fakeCellphones,
      dependents: [],
      ...props,
    })
  }

  static fakeMany(count: number, props?: Partial<CustomerProps>) {
    return count === 0
      ? []
      : Array.from({ length: count }).map(() => CustomersFaker.fake(props))
  }
}
