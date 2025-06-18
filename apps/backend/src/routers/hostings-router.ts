import { Hono } from 'hono'
import { HostingsRepository } from '../database/repositories/hostings-repository.js'
import type { HostingDto } from '@atlantis/core/dtos'

const hostingsRouter = new Hono()
const hostingsRepository = new HostingsRepository()

// GET /hostings - List all hostings
hostingsRouter.get('/', async (c) => {
  try {
    const hostings = await hostingsRepository.findAll()
    return c.json(hostings)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to fetch hostings' }, 500)
  }
})

// GET /hostings/:id - Get hosting by ID
hostingsRouter.get('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const hosting = await hostingsRepository.findById(id)

    if (!hosting) {
      return c.json({ error: 'Hosting not found' }, 404)
    }

    return c.json(hosting)
  } catch (error) {
    return c.json({ error: 'Failed to fetch hosting' }, 500)
  }
})

// POST /hostings - Create new hosting
hostingsRouter.post('/', async (c) => {
  try {
    const hostingData: HostingDto = await c.req.json()
    await hostingsRepository.add(hostingData)
    return c.json({ message: 'Hosting created successfully' }, 201)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to create hosting' }, 500)
  }
})

// PUT /hostings/:id - Update hosting
hostingsRouter.put('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const hostingData: HostingDto = await c.req.json()

    // Ensure the ID in the URL matches the ID in the body
    hostingData.id = id

    await hostingsRepository.update(hostingData)
    return c.json({ message: 'Hosting updated successfully' })
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to update hosting' }, 500)
  }
})

// DELETE /hostings/:id - Delete hosting
hostingsRouter.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    await hostingsRepository.remove(id)
    return c.json({ message: 'Hosting deleted successfully' })
  } catch (error) {
    return c.json({ error: 'Failed to delete hosting' }, 500)
  }
})

export { hostingsRouter }
