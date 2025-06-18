import type { Prototype } from '../interfaces/Prototype'
import type { CellphoneDto } from '../dtos'
import { Entity } from './Entity'

type CellphoneProps = {
  ddd: string
  number: string
}

export class Cellphone extends Entity<CellphoneProps> implements Prototype {
  static create(dto: CellphoneDto) {
    return new Cellphone(
      {
        ddd: dto.ddd,
        number: dto.number,
      },
      dto.id,
    )
  }

  get ddd(): string {
    return this.props.ddd
  }

  set ddd(ddd: string) {
    this.props.ddd = ddd
  }

  get number(): string {
    return this.props.number
  }

  set number(number: string) {
    this.props.number = number
  }

  get formattedValue(): string {
    return `(${this.props.ddd}) ${this.props.number}`
  }

  public clone(): Cellphone {
    return new Cellphone(this.props)
  }

  get dto(): CellphoneDto {
    return {
      ddd: this.ddd,
      number: this.number,
    }
  }
}
