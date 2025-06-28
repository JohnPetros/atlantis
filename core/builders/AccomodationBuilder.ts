import { Accommodation } from 'core/entities/Accommodation'
import type { Builder } from 'core/interfaces/Builder'

export class AccomodationBuilder implements Builder<Accommodation> {
  private accomodationName: string
  private singleBeds: number
  private coupleBeds: number
  private suites: number
  private garages: number
  private maxHostingsCount: number
  private hasAirConditioning: boolean

  constructor() {
    this.accomodationName = 'solteiro simples'
    this.singleBeds = 0
    this.coupleBeds = 0
    this.suites = 0
    this.maxHostingsCount = 0
    this.hasAirConditioning = false
    this.garages = 0
  }

  setAccomodationName(accomodationName: string): this {
    this.accomodationName = accomodationName
    return this
  }

  setSingleBeds(camaSolteiro: number): this {
    this.singleBeds = camaSolteiro
    return this
  }

  setCoupleBeds(coupleBeds: number): this {
    this.coupleBeds = coupleBeds
    return this
  }

  setSuites(suites: number): this {
    this.suites = suites
    return this
  }

  setHasAirConditioning(hasAirConditioning: boolean): this {
    this.hasAirConditioning = hasAirConditioning
    return this
  }

  setGarages(garages: number): this {
    this.garages = garages
    return this
  }

  setMaxHostingsCount(maxHostingsCount: number): this {
    this.maxHostingsCount = maxHostingsCount
    return this
  }

  build(): Accommodation {
    const accomodation = new Accommodation({
      accommodationName: this.accomodationName,
      singleBeds: this.singleBeds,
      coupleBeds: this.coupleBeds,
      suites: this.suites,
      hasAirConditioning: this.hasAirConditioning,
      garages: this.garages,
      maxHostingsCount: this.maxHostingsCount,
      hostingsCount: 0,
    })
    return accomodation
  }
}
