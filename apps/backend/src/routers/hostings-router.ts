import { Hono } from 'hono'

import type { HostingDto } from '@atlantis/core/dtos'

import { HostingsRepository } from '../database/repositories/hostings-repository.js'

const hostingsRouter = new Hono()
const hostingsRepository = new HostingsRepository()

hostingsRouter.get('/', async (c) => {
  try {
    const hostings = await hostingsRepository.findAll()
    return c.json(hostings)
  } catch (error) {
    console.error(error)
    return c.json({ message: 'Falha ao buscar hospedagens' }, 500)
  }
})

hostingsRouter.get('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const hosting = await hostingsRepository.findById(id)

    if (!hosting) {
      return c.json({ message: 'Hospedagem não encontrada' }, 404)
    }

    return c.json(hosting)
  } catch (error) {
    return c.json({ message: 'Falha ao buscar hospedagem' }, 500)
  }
})

hostingsRouter.post('/', async (c) => {
  try {
    const hostingData: HostingDto = await c.req.json()

    const hasHosting = await hostingsRepository.findByHostId(hostingData.hostId)
    if (hasHosting) {
      return c.json({ message: 'Acomodação já hospedada' }, 409)
    }

    await hostingsRepository.add(hostingData)
    return c.json({ message: 'Hospedagem criada com sucesso' }, 201)
  } catch (error) {
    console.error(error)
    return c.json({ message: 'Falha ao criar hospedagem' }, 500)
  }
})

hostingsRouter.put('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const hostingData: HostingDto = await c.req.json()

    const hasHosting = await hostingsRepository.findByAccommodationId(
      hostingData.accomodationId,
    )
    if (hasHosting) {
      return c.json({ message: 'Acomodação já hospedada' }, 409)
    }

    hostingData.id = id

    await hostingsRepository.update(hostingData)
    return c.json({ message: 'Hospedagem atualizada com sucesso' })
  } catch (error) {
    return c.json({ message: 'Falha ao atualizar hospedagem' }, 500)
  }
})

hostingsRouter.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    await hostingsRepository.remove(id)
    return c.json({ message: 'Hospedagem deletada com sucesso' })
  } catch (error) {
    return c.json({ message: 'Falha ao deletar hospedagem' }, 500)
  }
})

export { hostingsRouter }
