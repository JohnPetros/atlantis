import { Hono } from 'hono'
import { AccommodationsRepository } from '../database/repositories/accommodations-repository.js'
import type { AccommodationDto } from '@atlantis/core/dtos'

const accommodationsRouter = new Hono()
const accommodationsRepository = new AccommodationsRepository()

// GET /accommodations - List all accommodations
accommodationsRouter.get('/', async (c) => {
  try {
    const accommodations = await accommodationsRepository.findAll()
    return c.json(accommodations)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to fetch accommodations' }, 500)
  }
})

// GET /accommodations/:id - Get accommodation by ID
accommodationsRouter.get('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const accommodation = await accommodationsRepository.findById(id)

    if (!accommodation) {
      return c.json({ error: 'Accommodation not found' }, 404)
    }

    return c.json(accommodation)
  } catch (error) {
    return c.json({ error: 'Failed to fetch accommodation' }, 500)
  }
})

// POST /accommodations - Create new accommodation
accommodationsRouter.post('/', async (c) => {
  try {
    const accommodationData: AccommodationDto = await c.req.json()
    await accommodationsRepository.add(accommodationData)
    return c.json({ message: 'Accommodation created successfully' }, 201)
  } catch (error) {
    return c.json({ error: 'Failed to create accommodation' }, 500)
  }
})

// PUT /accommodations/:id - Update accommodation
accommodationsRouter.put('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const accommodationData: AccommodationDto = await c.req.json()

    // Ensure the ID in the URL matches the ID in the body
    accommodationData.id = id

    await accommodationsRepository.update(accommodationData)
    return c.json({ message: 'Accommodation updated successfully' })
  } catch (error) {
    return c.json({ error: 'Failed to update accommodation' }, 500)
  }
})

// DELETE /accommodations/:id - Delete accommodation
accommodationsRouter.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    await accommodationsRepository.remove(id)
    return c.json({ message: 'Accommodation deleted successfully' })
  } catch (error) {
    return c.json({ error: 'Failed to delete accommodation' }, 500)
  }
})

export { accommodationsRouter }
