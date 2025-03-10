import type { Accommodation } from '@/entities/Accommodation'
import { Command } from './Command'
import { Storage } from '@/utils/Storage'

export class ListAccommodationsCommand extends Command {
  private accommodations: Accommodation[]

  constructor() {
    super()
    this.accommodations = Storage.getInstance().accomodations
  }
  async execute() {
    this.output.table(
      this.accommodations.map((accomnodation) => ({
        Nome: accomnodation.accomodationName,
        'Nº de camas de solteiro': accomnodation.singleBeds,
        'Nº de camas de casal': accomnodation.coupleBeds,
        'Nº de suites': accomnodation.suites,
        'Nº de garagens': accomnodation.garages,
        'Possui climatização?': accomnodation.hasAirConditioning ? 'Sim' : 'Não',
      })),
    )
  }
}
