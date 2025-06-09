import { CustomersRepository } from './customers-repository'
import { AccommodationsRepository } from './accommodations-repository'
import { HostingsRepository } from './hostings-repository'

const customersRepository = CustomersRepository()
const accommodationsRepository = AccommodationsRepository()
const hostingsRepository = HostingsRepository()

export { customersRepository, accommodationsRepository, hostingsRepository }
