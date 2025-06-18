import type { CustomerDto } from '@atlantis/core/dtos'
import { Customer } from '@atlantis/core/entities'
import { prisma } from '../prisma.js'

export class CustomersRepository {
  async findAll(): Promise<CustomerDto[]> {
    const customers = await prisma.customer.findMany({
      include: {
        address: true,
        cellphones: true,
        documents: true,
        dependents: {
          include: {
            address: true,
            cellphones: true,
            documents: true,
          },
        },
      },
    })

    return customers.map(this.mapToDto)
  }

  async findById(id: string): Promise<CustomerDto | null> {
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        address: true,
        cellphones: true,
        documents: true,
        dependents: {
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
    const dependent = Customer.create(dependentDto)

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
    const dependent = Customer.create(dependentDto)

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
