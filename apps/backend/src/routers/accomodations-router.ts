import { Hono } from 'hono'
import { AccommodationsRepository } from '../database/repositories/accommodations-repository.js'
import type { AccommodationDto } from '@atlantis/core/dtos'

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

accommodationsRouter.post('/', async (c) => {
  try {
    const accommodationData: AccommodationDto = await c.req.json()
    const hasName = await accommodationsRepository.hasName(accommodationData.name)
    if (hasName) {
      return c.json({ message: 'Acomodação já existe com esse nome' }, 409)
    }

    await accommodationsRepository.add(accommodationData)
    return c.json({ message: 'Acomodação criada com sucesso' }, 201)
  } catch (error) {
    return c.json({ message: 'Falha ao criar acomodação' }, 500)
  }
})

accommodationsRouter.put('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const accommodationData: AccommodationDto = await c.req.json()

    const accommodation = await accommodationsRepository.findById(id)
    if (!accommodation) {
      return c.json({ message: 'Acomodação não encontrada' }, 404)
    }

    accommodationData.id = id

    if (accommodation.name !== accommodationData.name) {
      const hasName = await accommodationsRepository.hasName(accommodationData.name)
      if (hasName) {
        return c.json({ message: 'Acomodação já existe com esse nome' }, 409)
      }
    }

    await accommodationsRepository.update(accommodationData)
    return c.json({ message: 'Acomodação atualizada com sucesso' })
  } catch (error) {
    return c.json({ message: 'Falha ao atualizar acomodação' }, 500)
  }
})

accommodationsRouter.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    await accommodationsRepository.remove(id)
    return c.json({ message: 'Acomodação deletada com sucesso' })
  } catch (error) {
    return c.json({ message: 'Falha ao deletar acomodação' }, 500)
  }
})

export { accommodationsRouter }
