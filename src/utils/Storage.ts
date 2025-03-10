import { PlusFamilyDirector } from '@/directors/PlusFamilyDirector'
import { PlusSingleDirector } from '@/directors/PlusSingleDirector'
import { SimpleCupleDirector } from '@/directors/SimpleCoupleDirector'
import { SimpleFamilyDirector } from '@/directors/SimpleFamilyDirector'
import { SimpleSingleDirector } from '@/directors/SimpleSingleDirector'
import { SuperFamilyDirector } from '@/directors/SuperFamilyDirector'
import type { Accommodation } from '@/entities/Accommodation'
import type { Customer } from '@/entities/Customer'
import type { Hosting } from '@/entities/Hosting'
import { CustomersFaker } from '@/fakers/CustomersFaker'
import { faker } from '@faker-js/faker'

export class Storage {
  private static singleton: Storage = new Storage()
  private _accomodations: Accommodation[] = []
  private _customers: Customer[] = []
  private _hostings: Hosting[] = []

  private constructor() {
    const fakeCustomers = CustomersFaker.fakeMany(20)

    for (const fakeCustomer of fakeCustomers) {
      const fakeDependents: Customer[] = CustomersFaker.fakeMany(
        faker.number.int({ min: 0, max: 3 }),
        {
          address: fakeCustomer.address.clone(),
          cellphones: fakeCustomer.cellphones.map((cellphone) => cellphone.clone()),
        },
      )
      fakeCustomer.dependents = fakeDependents
    }
    this._customers = fakeCustomers

    const simpleSingleDirector = new SimpleSingleDirector()
    const simpleCupleDirector = new SimpleCupleDirector()
    const simpleFamilyDirector = new SimpleFamilyDirector()
    const plusSingleDirector = new PlusSingleDirector()
    const plusFamilyDirector = new PlusFamilyDirector()
    const superFamilyDirector = new SuperFamilyDirector()
    this._accomodations.push(
      simpleSingleDirector.build(),
      simpleCupleDirector.build(),
      simpleFamilyDirector.build(),
      plusSingleDirector.build(),
      plusFamilyDirector.build(),
      superFamilyDirector.build(),
    )
  }

  static getInstance(): Storage {
    return Storage.singleton
  }

  get customers() {
    return this._customers
  }

  get accomodations() {
    return this._accomodations
  }

  get hostings() {
    return this._hostings
  }

  getCustomerById(customerId: string) {
    return this._customers.find((customer) => customer.id === customerId)
  }

  addCustomer(customer: Customer) {
    this._customers.push(customer)
  }

  updateCustomer(updatedCustomer: Customer) {
    this._customers = this._customers.map((customer) =>
      updatedCustomer.isEqualTo(customer) ? updatedCustomer : customer,
    )
  }

  deleteCustomer(customer: Customer) {
    this._customers = this._customers.filter(
      (currentCustomer) => !currentCustomer.isEqualTo(customer),
    )
  }

  addAccommodation(accommodation: Accommodation) {
    this._accomodations.push(accommodation)
  }

  addHosting(hosting: Hosting) {
    this._hostings.push(hosting)
  }

  getHostingById(hostingId: string) {
    return this._hostings.find((hosting) => hosting.id === hostingId)
  }

  getHostingByHost(host: Customer) {
    return this._hostings.find((hosting) => hosting.hostId === host.id)
  }

  deleteHosting(hosting: Hosting) {
    this._hostings = this._hostings.filter(
      (currentHosting) => !currentHosting.isEqualTo(hosting),
    )
  }
}
