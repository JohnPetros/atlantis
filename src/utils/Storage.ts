import type { Customer } from '@/entities/Customer'
import { CustomersFaker } from '@/fakers/CustomersFaker'
import { faker } from '@faker-js/faker'

export class Storage {
  private static singleton: Storage = new Storage()
  private _customers: Customer[] = []

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
  }

  static getInstance(): Storage {
    return Storage.singleton
  }

  get customers() {
    return this._customers
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
}
