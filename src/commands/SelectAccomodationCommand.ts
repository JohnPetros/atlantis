import type { Accommodation } from '@/entities/Accommodation'
import { Command } from './Command'
import { AccommodationNameMenu } from '@/menus/AccommodationNameMenut'
import { AccomodationName } from '@/enums/AccomodationName'
import { PlusSingleDirector } from '@/directors/PlusSingleDirector'
import { SimpleFamilyDirector } from '@/directors/SimpleFamilyDirector'
import { SimpleCupleDirector } from '@/directors/SimpleCoupleDirector'
import { PlusFamilyDirector } from '@/directors/PlusFamilyDirector'
import { SimpleSingleDirector } from '@/directors/SimpleSingleDirector'
import { ListAccommodationsCommand } from './ListAccomodationsCommand'
import { SuperFamilyDirector } from '@/directors/SuperFamilyDirector'

export class SelectAccommodationCommand extends Command<Accommodation> {
  constructor() {
    super()
    this.menu = new AccommodationNameMenu(this.input)
    this.subcommand = new ListAccommodationsCommand()
  }

  async execute() {
    this.subcommand.execute()
    const accommodationDirector = await this.getAccommodationDirector()
    return accommodationDirector.build()
  }

  private async getAccommodationDirector() {
    const accomodationName = await this.menu.display()
    switch (accomodationName) {
      case AccomodationName.SIMPLE_SINGLE:
        return new SimpleSingleDirector()
      case AccomodationName.SIMPLE_COUPLE:
        return new SimpleCupleDirector()
      case AccomodationName.SIMPLE_FAMILY:
        return new SimpleFamilyDirector()
      case AccomodationName.PLUS_SINGLE:
        return new PlusSingleDirector()
      case AccomodationName.PLUS_FAMILY:
        return new PlusFamilyDirector()
      case AccomodationName.SUPER_FAMILY:
        return new SuperFamilyDirector()
      default:
        return new SimpleCupleDirector()
    }
  }
}
