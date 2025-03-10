import { DocumentType } from '@/enums/DocumentType'
import type { Address } from './Address'
import type { Cellphone } from './Cellphone'
import type { Document } from './Document'
import { Entity } from './Entity'

export type CustomerProps = {
  name: string
  socialName: string
  birthDate: Date
  registrationDate: Date
  cellphones: Cellphone[]
  documents: Document[]
  address?: Address
  dependents: Customer[]
  isHosted: boolean
}

export class Customer extends Entity<CustomerProps> {
  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get socialName(): string {
    return this.props.socialName
  }

  set socialName(socialName: string) {
    this.props.socialName = socialName
  }

  get birthDate(): Date {
    return this.props.birthDate
  }

  set birthDate(birthDate: Date) {
    this.props.birthDate = birthDate
  }

  get registrationDate(): Date {
    return this.props.registrationDate
  }

  get cellphones(): Cellphone[] {
    return this.props.cellphones
  }

  set cellphones(cellphones: Cellphone[]) {
    this.props.cellphones = cellphones
  }

  get address(): Address {
    if (!this.props.address) throw new Error('Sem endereço')
    return this.props.address
  }

  set address(address: Address) {
    this.props.address = address
  }

  get documents(): Document[] {
    return this.props.documents
  }

  get isHosted(): boolean {
    return this.props.isHosted
  }

  set isHosted(isHosted: boolean) {
    this.props.isHosted = isHosted
    this.props.dependents.forEach((dependent) => (dependent.isHosted = true))
  }

  get dependents(): Customer[] {
    return this.props.dependents
  }

  set dependents(dependents: Customer[]) {
    this.props.dependents = dependents
  }

  addDependent(dependent: Customer): void {
    if (!this.props.dependents) {
      this.props.dependents = []
    }

    this.props.dependents?.push(dependent)
  }

  updateDependent(updatedDependent: Customer) {
    this.props.dependents = this.props.dependents.filter((currentDependent) =>
      currentDependent.isEqualTo(updatedDependent) ? updatedDependent : currentDependent,
    )
  }

  updateDependentsAddress(): void {
    this.props.dependents.forEach((dependent) => (dependent.address = this.address))
  }

  updateDependentsCellphones(): void {
    this.props.dependents.forEach((dependent) => (dependent.cellphones = this.cellphones))
  }

  removeDependent(dependent: Customer): void {
    this.props.dependents = this.props.dependents.filter(
      (currentDependent) => !currentDependent.isEqualTo(dependent),
    )
  }

  hasDependent(dependent: Customer): boolean {
    return this.dependents.some((currentDependent) =>
      currentDependent.isEqualTo(dependent),
    )
  }

  hasAnyDependent(): boolean {
    return this.props.dependents.length > 0
  }

  hasCellphone(cellphoneNumber: string): boolean {
    return this.props.cellphones.some(
      (currentCellphone) => currentCellphone.number === cellphoneNumber,
    )
  }

  removeDocument(document: Document): void {
    this.props.documents = this.props.documents.filter(
      (currentDocument) => currentDocument.number !== document.number,
    )
  }

  removeCellphone(cellphone: Cellphone): void {
    this.props.cellphones = this.props.cellphones.filter(
      (currentcellphone) => currentcellphone.number !== cellphone.number,
    )
  }

  hasCpf(): boolean {
    return this.props.documents.some((document) => document.type === DocumentType.CPF)
  }

  hasRg(): boolean {
    return this.props.documents.some((document) => document.type === DocumentType.RG)
  }

  hasPassport(): boolean {
    return this.props.documents.some(
      (document) => document.type === DocumentType.PASSAPORTE,
    )
  }

  addCellphone(cellphone: Cellphone): void {
    this.props.cellphones.push(cellphone)
  }
}
