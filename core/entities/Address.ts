import type { Prototype } from 'core/interfaces/Prototype'
import { Entity } from './Entity'
import type { AddressDto } from 'core/dtos'

type AddressProps = {
  street: string
  neighborhood: string
  city: string
  state: string
  country: string
  zipcode: string
}

export class Address extends Entity<AddressProps> implements Prototype {
  static create(dto: AddressDto) {
    return new Address(
      {
        street: dto.street,
        neighborhood: dto.neighborhood,
        city: dto.city,
        state: dto.state,
        country: dto.country,
        zipcode: dto.zipcode,
      },
      dto.id,
    )
  }

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

  get dto(): AddressDto {
    return {
      street: this.street,
      neighborhood: this.neighborhood,
      city: this.city,
      state: this.state,
      country: this.country,
      zipcode: this.zipcode,
    }
  }

  clone(): Address {
    return new Address(this.props)
  }
}
