import type { AddressDto } from '../dtos'

export class AddressFormatter {
  static format(address: AddressDto): string {
    return `${address.city}, ${address.state}`
  }
}
