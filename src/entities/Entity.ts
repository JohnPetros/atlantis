import { v4 as generateId } from 'uuid'

export class Entity<Props> {
  private _id: string
  protected readonly props: Props

  constructor(props: Props, id?: string) {
    this._id = id ?? generateId().slice(0, 4)
    this.props = props
  }

  isEqualTo(entity: Entity<Props>): boolean {
    return this._id === entity._id
  }

  get id() {
    return this._id
  }
}
