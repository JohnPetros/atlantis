import { Hono } from 'hono'
import { AccommodationsRepository } from '../database/repositories/accommodations-repository.js'

const accommodationsRouter = new Hono()
const accommodationsRepository = new AccommodationsRepository()

accommodationsRouter.get('/', async (c) => {
  try {
    const accommodations = await accommodationsRepository.findAll()
    return c.json(accommodations)
  } catch (error) {
    console.error(error)
    return c.json({ message: 'Falha ao buscar acomodações' }, 500)
  }
})

accommodationsRouter.get('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const accommodation = await accommodationsRepository.findById(id)

    if (!accommodation) {
      return c.json({ message: 'Acomodação não encontrada' }, 404)
    }

    return c.json(accommodation)
  } catch (error) {
    return c.json({ message: 'Falha ao buscar acomodação' }, 500)
  }
})

export { accommodationsRouter }
