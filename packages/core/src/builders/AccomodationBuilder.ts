import { Accommodation } from '../entities/Accommodation'
import type { Builder } from '../interfaces/Builder'

export class AccomodationBuilder implements Builder<Accommodation> {
  private accomodationName: string
  private singleBeds: number
  private coupleBeds: number
  private suites: number
  private garages: number
  private hasAirConditioning: boolean

  constructor() {
    this.accomodationName = 'solteiro simples'
    this.singleBeds = 0
    this.coupleBeds = 0
    this.suites = 0
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

  build(): Accommodation {
    const accomodation = new Accommodation({
      accommodationName: this.accomodationName,
      singleBeds: this.singleBeds,
      coupleBeds: this.coupleBeds,
      suites: this.suites,
      hasAirConditioning: this.hasAirConditioning,
      garages: this.garages,
    })
    return accomodation
  }
}
