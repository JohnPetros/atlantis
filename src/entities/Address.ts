import type { Prototype } from '@/interfaces/Prototype'
import { Entity } from './Entity'

type AddressProps = {
  street: string
  neighborhood: string
  city: string
  state: string
  country: string
  postalCode: string
}

export class Address extends Entity<AddressProps> implements Prototype {
  get street(): string {
    return this.props.street
  }

  get neighborhood(): string {
    return this.props.neighborhood
  }

  get city(): string {
    return this.props.city
  }

  get state(): string {
    return this.props.state
  }

  get postalCode(): string {
    return this.props.postalCode
  }

  get country(): string {
    return this.props.country
  }

  public clone(): Address {
    return new Address(this.props)
  }
}
