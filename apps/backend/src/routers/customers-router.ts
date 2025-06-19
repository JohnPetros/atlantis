import { Hono } from 'hono'
import { CustomersRepository } from '../database/repositories/customers-repository.js'
import type { CustomerDto } from '@atlantis/core/dtos'
import { Cellphone, Customer, Document } from '@atlantis/core/entities'

const customersRouter = new Hono()
const customersRepository = new CustomersRepository()

customersRouter.get('/', async (c) => {
  try {
    const customers = await customersRepository.findAll()
    return c.json(customers)
  } catch (error) {
    console.error(error)
    return c.json({ message: 'Falha ao buscar clientes' }, 500)
  }
})

customersRouter.get('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const customer = await customersRepository.findById(id)

    if (!customer) {
      return c.json({ message: 'Cliente não encontrado' }, 404)
    }

    return c.json(customer)
  } catch (error) {
    return c.json({ message: 'Falha ao buscar cliente' }, 500)
  }
})

customersRouter.post('/', async (c) => {
  try {
    const customerData: CustomerDto = await c.req.json()
    for (const document of customerData.documents) {
      const hasDocument = await customersRepository.hasDocument(document)
      if (hasDocument) {
        return c.json({ message: `${document.type} já cadastrado` }, 409)
      }
    }

    for (const cellphone of customerData.cellphones) {
      const hasCellphone = await customersRepository.hasCellphone(cellphone)
      if (hasCellphone) {
        return c.json({ message: 'Celular já cadastrado' }, 409)
      }
    }

    await customersRepository.add(customerData)
    return c.json({ message: 'Cliente criado com sucesso' }, 201)
  } catch (error) {
    return c.json({ message: 'Falha ao criar cliente' }, 500)
  }
})

customersRouter.put('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const customerData: CustomerDto = await c.req.json()

    const customerDto = await customersRepository.findById(id)
    if (!customerDto) {
      return c.json({ message: 'Cliente não encontrado' }, 404)
    }

    for (const document of customerData.documents) {
      const customer = Customer.create(customerDto)
      if (!customer.hasDocument(Document.create(document))) {
        const hasDuplicateDocument = await customersRepository.hasDocument(document)
        if (hasDuplicateDocument) {
          return c.json({ message: `${document.type} já cadastrado` }, 409)
        }
      }
    }

    customerData.id = id

    await customersRepository.update(customerData)
    return c.json({ message: 'Cliente atualizado com sucesso' })
  } catch (error) {
    return c.json({ message: 'Falha ao atualizar cliente' }, 500)
  }
})

customersRouter.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    await customersRepository.remove(id)
    return c.json({ message: 'Cliente deletado com sucesso' })
  } catch (error) {
    console.error(c.req.param('id'))
    return c.json({ message: 'Falha ao deletar cliente' }, 500)
  }
})

customersRouter.post('/:id/dependents', async (c) => {
  try {
    const customerId = c.req.param('id')
    const dependentData: CustomerDto = await c.req.json()

    await customersRepository.addDependent(customerId, dependentData)
    return c.json({ message: 'Dependente adicionado com sucesso' }, 201)
  } catch (error) {
    return c.json({ message: 'Falha ao adicionar dependente' }, 500)
  }
})

customersRouter.put('/:id/dependents/:dependentId', async (c) => {
  try {
    const customerId = c.req.param('id')
    const dependentId = c.req.param('dependentId')
    const dependentData: CustomerDto = await c.req.json()

    dependentData.id = dependentId

    const dependentDto = await customersRepository.findById(dependentId)
    if (!dependentDto) {
      return c.json({ message: 'Cliente não encontrado' }, 404)
    }

    for (const document of dependentData.documents) {
      const dependent = Customer.create(dependentDto)
      if (!dependent.hasDocument(Document.create(document))) {
        const hasDuplicateDocument = await customersRepository.hasDocument(document)
        if (hasDuplicateDocument) {
          return c.json({ message: `${document.type} já cadastrado` }, 409)
        }
      }
    }

    await customersRepository.updateDependent(customerId, dependentData)
    return c.json({ message: 'Dependente atualizado com sucesso' })
  } catch (error) {
    return c.json({ message: 'Falha ao atualizar dependente' }, 500)
  }
})

customersRouter.delete('/:id/dependents/:dependentId', async (c) => {
  try {
    const customerId = c.req.param('id')
    const dependentId = c.req.param('dependentId')

    await customersRepository.removeDependent(customerId, dependentId)
    return c.json({ message: 'Dependente removido com sucesso' })
  } catch (error) {
    return c.json({ message: 'Falha ao remover dependente' }, 500)
  }
})

export { customersRouter }
