import type { Prototype } from '@/interfaces/Prototype'
import { Entity } from './Entity'

type CellphoneProps = {
  ddd: string
  number: string
}

export class Cellphone extends Entity<CellphoneProps> implements Prototype {
  get ddd(): string {
    return this.props.ddd
  }

  get number(): string {
    return this.props.number
  }

  public clone(): Cellphone {
    return new Cellphone(this.props)
  }
}
