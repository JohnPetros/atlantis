import type { Builder } from 'core/interfaces/Builder'

export abstract class Director<Object> {
  protected builder!: Builder<Object>

  public abstract build(): Object
}
