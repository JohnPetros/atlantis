import type { Address } from './Address'
import type { Cellphone } from './Cellphone'
import type { Document } from './Document'
import { Entity } from './Entity'

type ClientProps = {
  name: string
  socialName: string
  birthDate: Date
  registrationDate: Date
  cellphones: Cellphone[]
  address: Address
  documents: Document[]
  dependents?: Customer[]
  guardian?: Customer
}

export class Customer extends Entity<ClientProps> {
  get name(): string {
    return this.props.name
  }

  get socialName(): string {
    return this.props.socialName
  }

  get birthDate(): Date {
    return this.props.birthDate
  }

  get registrationDate(): Date {
    return this.props.registrationDate
  }

  get cellphones(): Cellphone[] {
    return this.props.cellphones
  }

  get address(): Address {
    return this.props.address
  }

  get documents(): Document[] {
    return this.props.documents
  }

  get guardian(): Customer | undefined {
    return this.props.guardian
  }

  get dependents(): Customer[] | undefined {
    return this.props.dependents
  }

  public addDependent(dependent: Customer): void {
    if (!this.props.dependents) {
      this.props.dependents = []
    }

    this.props.dependents?.push(dependent)
  }
}
