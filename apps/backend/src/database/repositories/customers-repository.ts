import type { CellphoneDto, CustomerDto, DocumentDto } from '@atlantis/core/dtos'
import { Customer } from '@atlantis/core/entities'
import { prisma } from '../prisma.js'
import { CustomersFaker } from '@atlantis/core/fakers'
import type { DocumentType } from '@atlantis/core/enums'

export class CustomersRepository {
  constructor() {
    this.seed()
  }

  async findAll(): Promise<CustomerDto[]> {
    const customers = await prisma.customer.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        address: true,
        cellphones: true,
        documents: true,
        dependents: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            address: true,
            cellphones: true,
            documents: true,
          },
        },
      },
      where: {
        parentId: null,
      },
    })

    return customers.map(this.mapToDto)
  }

  async findById(id: string): Promise<CustomerDto | null> {
    const customer = await prisma.customer.findUnique({
      where: { id, parentId: null },
      include: {
        address: true,
        cellphones: true,
        documents: true,
        dependents: {
          orderBy: {
            createdAt: 'asc',
          },
          include: {
            address: true,
            cellphones: true,
            documents: true,
          },
        },
      },
    })

    return customer ? this.mapToDto(customer) : null
  }

  async hasDocument(document: DocumentDto): Promise<boolean> {
    const documentExists = await prisma.document.findFirst({
      where: { number: document.number, type: document.type as DocumentType },
    })
    return Boolean(documentExists)
  }

  async hasCellphone(cellphone: CellphoneDto): Promise<boolean> {
    const cellphoneExists = await prisma.cellphone.findFirst({
      where: { number: cellphone.number, ddd: cellphone.ddd },
    })
    return Boolean(cellphoneExists)
  }

  async add(customerDto: CustomerDto): Promise<void> {
    const customer = Customer.create(customerDto)

    await prisma.customer.create({
      data: {
        id: customer.id,
        name: customer.name,
        socialName: customer.socialName,
        birthDate: customer.birthDate,
        registrationDate: customer.registrationDate,
        isHosted: customer.isHosted,
        address: customer.address
          ? {
              create: {
                street: customer.address.street,
                neighborhood: customer.address.neighborhood,
                city: customer.address.city,
                state: customer.address.state,
                country: customer.address.country,
                zipcode: customer.address.zipcode,
              },
            }
          : undefined,
        cellphones: {
          create: customer.cellphones.map((cellphone) => ({
            ddd: cellphone.dto.ddd,
            number: cellphone.dto.number,
          })),
        },
        documents: {
          create: customer.documents.map((document) => ({
            number: document.number,
            type: document.type,
            expeditionDate: document.expeditionDate,
          })),
        },
      },
    })
  }

  async addDependent(customerId: string, dependentDto: CustomerDto): Promise<void> {
    const customerDto = await this.findById(customerId)
    if (!customerDto) return

    const customer = Customer.create(customerDto)
    const dependent = Customer.create({
      ...dependentDto,
      address: customer?.address.clone(),
      cellphones: customer?.cellphones.map((cellphone) => cellphone.clone()),
    })

    await prisma.customer.update({
      where: { id: customerId },
      data: {
        dependents: {
          create: {
            id: dependent.id,
            name: dependent.name,
            socialName: dependent.socialName,
            birthDate: dependent.birthDate,
            registrationDate: dependent.registrationDate,
            isHosted: dependent.isHosted,
            address: dependent.address
              ? {
                  create: {
                    street: dependent.address.street,
                    neighborhood: dependent.address.neighborhood,
                    city: dependent.address.city,
                    state: dependent.address.state,
                    country: dependent.address.country,
                    zipcode: dependent.address.zipcode,
                  },
                }
              : undefined,
            cellphones: {
              create: dependent.cellphones.map((cellphone) => ({
                ddd: cellphone.dto.ddd,
                number: cellphone.dto.number,
              })),
            },
            documents: {
              create: dependent.documents.map((document) => ({
                number: document.number,
                type: document.type,
                expeditionDate: document.expeditionDate,
              })),
            },
          },
        },
      },
    })
  }

  async update(customerDto: CustomerDto): Promise<void> {
    const customer = Customer.create(customerDto)

    await prisma.customer.update({
      where: { id: customer.id },
      data: {
        name: customer.name,
        socialName: customer.socialName,
        birthDate: customer.birthDate,
        registrationDate: customer.registrationDate,
        isHosted: customer.isHosted,
        address: customer.address
          ? {
              upsert: {
                create: {
                  street: customer.address.street,
                  neighborhood: customer.address.neighborhood,
                  city: customer.address.city,
                  state: customer.address.state,
                  country: customer.address.country,
                  zipcode: customer.address.zipcode,
                },
                update: {
                  street: customer.address.street,
                  neighborhood: customer.address.neighborhood,
                  city: customer.address.city,
                  state: customer.address.state,
                  country: customer.address.country,
                  zipcode: customer.address.zipcode,
                },
              },
            }
          : {
              delete: true,
            },
        cellphones: {
          deleteMany: {},
          create: customer.cellphones.map((cellphone) => ({
            ddd: cellphone.dto.ddd,
            number: cellphone.dto.number,
          })),
        },
        documents: {
          deleteMany: {},
          create: customer.documents.map((document) => ({
            number: document.number,
            type: document.type,
            expeditionDate: document.expeditionDate,
          })),
        },
      },
    })
  }

  async updateDependent(customerId: string, dependentDto: CustomerDto): Promise<void> {
    const customerDto = await this.findById(customerId)
    if (!customerDto) return

    const customer = Customer.create(customerDto)
    const dependent = Customer.create({
      ...dependentDto,
      address: customer?.address.clone(),
      cellphones: customer?.cellphones.map((cellphone) => cellphone.clone()),
    })

    await prisma.customer.update({
      where: {
        id: dependent.id,
        parentId: customerId,
      },
      data: {
        name: dependent.name,
        socialName: dependent.socialName,
        birthDate: dependent.birthDate,
        registrationDate: dependent.registrationDate,
        isHosted: dependent.isHosted,
        address: dependent.address
          ? {
              upsert: {
                create: {
                  street: dependent.address.street,
                  neighborhood: dependent.address.neighborhood,
                  city: dependent.address.city,
                  state: dependent.address.state,
                  country: dependent.address.country,
                  zipcode: dependent.address.zipcode,
                },
                update: {
                  street: dependent.address.street,
                  neighborhood: dependent.address.neighborhood,
                  city: dependent.address.city,
                  state: dependent.address.state,
                  country: dependent.address.country,
                  zipcode: dependent.address.zipcode,
                },
              },
            }
          : {
              delete: true,
            },
        cellphones: {
          deleteMany: {},
          create: dependent.cellphones.map((cellphone) => ({
            ddd: cellphone.dto.ddd,
            number: cellphone.dto.number,
          })),
        },
        documents: {
          deleteMany: {},
          create: dependent.documents.map((document) => ({
            number: document.number,
            type: document.type,
            expeditionDate: document.expeditionDate,
          })),
        },
      },
    })
  }

  async remove(id: string): Promise<void> {
    await prisma.customer.delete({
      where: { id },
    })
  }

  async removeDependent(customerId: string, dependentId: string): Promise<void> {
    await prisma.customer.delete({
      where: {
        id: dependentId,
        parentId: customerId,
      },
    })
  }

  private async seed() {
    const count = await prisma.customer.count()

    if (count === 0) {
      const customers = CustomersFaker.fakeMany(1000)
      for (const customer of customers) {
        await this.add(customer.dto)
      }
    }
  }

  private mapToDto(customer: any): CustomerDto {
    return {
      id: customer.id,
      name: customer.name,
      socialName: customer.socialName,
      birthDate: customer.birthDate.toISOString(),
      registrationDate: customer.registrationDate.toISOString(),
      address: customer.address
        ? {
            id: customer.address.id,
            street: customer.address.street,
            neighborhood: customer.address.neighborhood,
            city: customer.address.city,
            state: customer.address.state,
            country: customer.address.country,
            zipcode: customer.address.zipcode,
          }
        : {
            street: '',
            neighborhood: '',
            city: '',
            state: '',
            country: '',
            zipcode: '',
          },
      cellphones: customer.cellphones.map((cellphone: any) => ({
        id: cellphone.id,
        ddd: cellphone.ddd,
        number: cellphone.number,
      })),
      documents: customer.documents.map((document: any) => ({
        id: document.id,
        number: document.number,
        type: document.type,
        expeditionDate: document.expeditionDate.toISOString(),
      })),
      dependents: customer.dependents.map((dependent: any) => ({
        id: dependent.id,
        name: dependent.name,
        socialName: dependent.socialName,
        birthDate: dependent.birthDate.toISOString(),
        registrationDate: dependent.registrationDate.toISOString(),
        address: dependent.address
          ? {
              id: dependent.address.id,
              street: dependent.address.street,
              neighborhood: dependent.address.neighborhood,
              city: dependent.address.city,
              state: dependent.address.state,
              country: dependent.address.country,
              zipcode: dependent.address.zipcode,
            }
          : {
              street: '',
              neighborhood: '',
              city: '',
              state: '',
              country: '',
              zipcode: '',
            },
        cellphones: dependent.cellphones.map((cellphone: any) => ({
          id: cellphone.id,
          ddd: cellphone.ddd,
          number: cellphone.number,
        })),
        documents: dependent.documents.map((document: any) => ({
          id: document.id,
          number: document.number,
          type: document.type,
          expeditionDate: document.expeditionDate.toISOString(),
        })),
        dependents: [],
      })),
    }
  }
}
