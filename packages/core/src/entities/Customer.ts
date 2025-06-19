import { DocumentType } from '../enums/DocumentType'
import { Address } from './Address'
import { Cellphone } from './Cellphone'
import { Document } from './Document'
import { Entity } from './Entity'
import type { CustomerDto } from '../dtos'

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
  static create(dto: CustomerDto) {
    return new Customer(
      {
        name: dto.name,
        socialName: dto.socialName,
        birthDate: new Date(dto.birthDate),
        registrationDate: new Date(dto.registrationDate),
        cellphones: dto.cellphones.map((cellphone) => Cellphone.create(cellphone)),
        documents: dto.documents.map((document) => Document.create(document)),
        address: Address.create(dto.address),
        dependents: [],
        isHosted: false,
      },
      dto.id,
    )
  }

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

  get cellphonesFormatted(): string {
    return this.props.cellphones.map((cellphone) => cellphone.number).join(', ')
  }

  set cellphones(cellphones: Cellphone[]) {
    this.props.cellphones = cellphones
  }

  get address(): Address {
    if (!this.props.address) throw new Error('Sem endereço')
    return this.props.address
  }

  get addressFormatted(): string {
    return this.props.address?.formattedValue ?? 'Não possui endereço'
  }

  set address(address: Address) {
    this.props.address = address
  }

  get documents(): Document[] {
    return this.props.documents
  }

  get documentsFormatted(): string {
    return this.props.documents.map((document) => document.number).join(', ')
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

  hasDocument(document: Document): boolean {
    return this.props.documents.some((currentDocument) =>
      currentDocument.isEqualTo(document),
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

  get dto(): CustomerDto {
    return {
      id: this.id,
      name: this.name,
      socialName: this.socialName,
      birthDate: this.birthDate.toISOString(),
      registrationDate: this.registrationDate.toISOString(),
      documents: this.documents.map((document) => document.dto),
      cellphones: this.cellphones.map((cellphone) => cellphone.dto),
      address: this.address.dto,
      dependents: this.dependents.map((dependent) => dependent.dto),
    }
  }
}
