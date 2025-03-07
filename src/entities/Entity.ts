import { v4 as generateId } from 'uuid'

export class Entity<Props> {
  private id: string
  protected readonly props: Props

  constructor(props: Props, id?: string) {
    this.id = id ?? generateId().slice(0, 4)
    this.props = props
  }

  isEqualTo(entity: Entity<Props>): boolean {
    return this.id === entity.id
  }
}
