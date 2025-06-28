import type { AccommodationDto } from 'core/dtos'
import { Entity } from './Entity'

export type AccommodationProps = {
  accommodationName: string
  singleBeds: number
  coupleBeds: number
  suites: number
  garages: number
  hasAirConditioning: boolean
  hostingsCount: number
  maxHostingsCount: number
}

export class Accommodation extends Entity<AccommodationProps> {
  static create(dto: AccommodationDto) {
    return new Accommodation(
      {
        accommodationName: dto.name,
        singleBeds: dto.singleBeds,
        coupleBeds: dto.coupleBeds,
        suites: dto.suites,
        garages: dto.garages,
        hostingsCount: dto.hostingsCount,
        maxHostingsCount: dto.maxHostingsCount,
        hasAirConditioning: dto.hasAirConditioning,
      },
      dto.id,
    )
  }

  get accommodationName(): string {
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

  get hostingsCount(): number {
    return this.props.hostingsCount
  }

  get maxHostingsCount(): number {
    return this.props.maxHostingsCount
  }

  get dto(): AccommodationDto {
    return {
      id: this.id,
      name: this.accommodationName,
      singleBeds: this.singleBeds,
      coupleBeds: this.coupleBeds,
      suites: this.suites,
      garages: this.garages,
      hasAirConditioning: this.hasAirConditioning,
      hostingsCount: this.hostingsCount,
      maxHostingsCount: this.maxHostingsCount,
    }
  }
}
