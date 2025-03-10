import type { AccomodationName } from '@/enums/AccomodationName'
import type { Customer } from './Customer'
import { Entity } from './Entity'

type AccommodationProps = {
  accommodationName: AccomodationName
  singleBeds: number
  coupleBeds: number
  suites: number
  hasAirConditioning: boolean
  garages: number
}

export class Accommodation extends Entity<AccommodationProps> {
  get accomodationName(): AccomodationName {
    return this.props.accommodationName
  }

  get singleBeds(): number {
    return this.props.singleBeds
  }

  get coupleBeds(): number {
    return this.props.coupleBeds
  }

  get suites(): number {
    return this.props.suites
  }

  get hasAirConditioning(): boolean {
    return this.props.hasAirConditioning
  }

  get garages(): number {
    return this.props.garages
  }
}
