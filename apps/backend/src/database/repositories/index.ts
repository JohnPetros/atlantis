import { CustomersRepository } from './customers-repository.js'
import { AccommodationsRepository } from './accommodations-repository.js'
import { HostingsRepository } from './hostings-repository.js'

const customersRepository = new CustomersRepository()
const accommodationsRepository = new AccommodationsRepository()
const hostingsRepository = new HostingsRepository()

export { customersRepository, accommodationsRepository, hostingsRepository }
