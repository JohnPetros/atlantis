import type { Prototype } from '@/interfaces/Prototype'
import { Entity } from './Entity'

type AddressProps = {
  street: string
  neighborhood: string
  city: string
  state: string
  country: string
  zipcode: string
}

export class Address extends Entity<AddressProps> implements Prototype {
  get street(): string {
    return this.props.street
  }

  set street(street: string) {
    this.props.street = street
  }

  get neighborhood(): string {
    return this.props.neighborhood
  }

  set neighborhood(neighborhood: string) {
    this.props.neighborhood = neighborhood
  }

  get city(): string {
    return this.props.city
  }

  set city(city: string) {
    this.props.city = city
  }

  get state(): string {
    return this.props.state
  }

  set state(state: string) {
    this.props.state = state
  }

  get zipcode(): string {
    return this.props.zipcode
  }

  set zipcode(zipcode: string) {
    this.props.zipcode = zipcode
  }

  get country(): string {
    return this.props.country
  }

  set country(country: string) {
    this.props.country = country
  }

  get formattedValue(): string {
    return `${this.street}, ${this.state} - ${this.zipcode}. ${this.country.toUpperCase()}`
  }

  public clone(): Address {
    return new Address(this.props)
  }
}
