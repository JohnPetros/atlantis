import { Hono } from 'hono'
import { CustomersRepository } from '../database/repositories/customers-repository.js'
import type { CustomerDto } from '@atlantis/core/dtos'

const customersRouter = new Hono()
const customersRepository = new CustomersRepository()

// GET /customers - List all customers
customersRouter.get('/', async (c) => {
  try {
    const customers = await customersRepository.findAll()
    return c.json(customers)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to fetch customers' }, 500)
  }
})

// GET /customers/:id - Get customer by ID
customersRouter.get('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const customer = await customersRepository.findById(id)

    if (!customer) {
      return c.json({ error: 'Customer not found' }, 404)
    }

    return c.json(customer)
  } catch (error) {
    return c.json({ error: 'Failed to fetch customer' }, 500)
  }
})

// POST /customers - Create new customer
customersRouter.post('/', async (c) => {
  try {
    const customerData: CustomerDto = await c.req.json()
    await customersRepository.add(customerData)
    return c.json({ message: 'Customer created successfully' }, 201)
  } catch (error) {
    return c.json({ error: 'Failed to create customer' }, 500)
  }
})

// PUT /customers/:id - Update customer
customersRouter.put('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const customerData: CustomerDto = await c.req.json()

    // Ensure the ID in the URL matches the ID in the body
    customerData.id = id

    await customersRepository.update(customerData)
    return c.json({ message: 'Customer updated successfully' })
  } catch (error) {
    return c.json({ error: 'Failed to update customer' }, 500)
  }
})

// DELETE /customers/:id - Delete customer
customersRouter.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    await customersRepository.remove(id)
    return c.json({ message: 'Customer deleted successfully' })
  } catch (error) {
    return c.json({ error: 'Failed to delete customer' }, 500)
  }
})

// POST /customers/:id/dependents - Add dependent to customer
customersRouter.post('/:id/dependents', async (c) => {
  try {
    const customerId = c.req.param('id')
    const dependentData: CustomerDto = await c.req.json()

    await customersRepository.addDependent(customerId, dependentData)
    return c.json({ message: 'Dependent added successfully' }, 201)
  } catch (error) {
    return c.json({ error: 'Failed to add dependent' }, 500)
  }
})

// PUT /customers/:id/dependents/:dependentId - Update dependent
customersRouter.put('/:id/dependents/:dependentId', async (c) => {
  try {
    const customerId = c.req.param('id')
    const dependentId = c.req.param('dependentId')
    const dependentData: CustomerDto = await c.req.json()

    // Ensure the dependent ID in the URL matches the ID in the body
    dependentData.id = dependentId

    await customersRepository.updateDependent(customerId, dependentData)
    return c.json({ message: 'Dependent updated successfully' })
  } catch (error) {
    return c.json({ error: 'Failed to update dependent' }, 500)
  }
})

// DELETE /customers/:id/dependents/:dependentId - Remove dependent
customersRouter.delete('/:id/dependents/:dependentId', async (c) => {
  try {
    const customerId = c.req.param('id')
    const dependentId = c.req.param('dependentId')

    await customersRepository.removeDependent(customerId, dependentId)
    return c.json({ message: 'Dependent removed successfully' })
  } catch (error) {
    return c.json({ error: 'Failed to remove dependent' }, 500)
  }
})

export { customersRouter }
