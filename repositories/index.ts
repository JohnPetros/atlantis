import { CustomersRepository } from './customers-repository'
import { AccommodationsRepository } from './accommodations-repository'

const customersRepository = CustomersRepository()
const accommodationsRepository = AccommodationsRepository()

export { customersRepository, accommodationsRepository }
