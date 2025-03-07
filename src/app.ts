import { Customer } from './entities/Customer'
import { Address } from './entities/Address'
import { Cellphone } from './entities/Cellphone'
import { Document } from './entities/Document'
import { DocumentType } from './enums/DocumentType'

const customer = new Customer({
  name: 'Pedro de Alcântara João Carlos Leopoldo Salvador',
  socialName: 'Dom Pedro II',
  birthDate: new Date(1825, 11, 2),
  registrationDate: new Date(1840, 6, 23),
  cellphones: [new Cellphone({ ddd: '21', number: '99999-9999' })],
  address: new Address({
    street: 'R. do Catete',
    neighborhood: 'Copacabana',
    city: 'Rio de Janeiro',
    country: 'Brasil',
    state: 'Rio de Janeiro',
    postalCode: '22220-000',
  }),
  documents: [
    new Document({
      number: '123456789',
      type: DocumentType.RG,
      expeditionDate: new Date(1835, 5, 10),
    }),
  ],
  dependents: [],
})

const dependente = new Customer({
  name: 'Isabel Cristina Leopoldina Augusta Micaela',
  socialName: 'Princesa Isabel',
  birthDate: new Date(1846, 6, 29),
  registrationDate: new Date(1921, 10, 14),
  cellphones: customer.cellphones.map((cellphone) => cellphone.clone()),
  address: customer.address.clone(),
  documents: [
    new Document({
      number: '987654321',
      type: DocumentType.RG,
      expeditionDate: new Date(1860, 3, 15),
    }),
  ],
  guardian: customer,
  dependents: [],
})

customer.addDependent(dependente)

console.log(customer)
console.log(dependente)
