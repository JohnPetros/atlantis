import type { AddressDto } from 'core/dtos'

export class AddressFormatter {
  static format(address: AddressDto): string {
    return `${address.city}, ${address.state}`
  }
}
