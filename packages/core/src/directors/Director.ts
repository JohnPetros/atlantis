import type { Builder } from '../interfaces/Builder'

export abstract class Director<Object> {
  protected builder!: Builder<Object>

  public abstract build(): Object
}
