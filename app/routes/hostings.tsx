import { Hosting } from 'core/entities/Hosting'
import {
  accommodationsRepository,
  customersRepository,
  hostingsRepository,
} from 'repositories'
import { ActionContextProvider } from 'ui/contexts/action-context'
import type { Route } from './+types/customers'
import { HostingsPage } from 'ui/pages/hostings'

export const clientLoader = async () => {
  const hostings = await hostingsRepository.findAll()
  const customers = await customersRepository.findAll()
  const accommodations = await accommodationsRepository.findAll()
  return { hostings, customers, accommodations }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const action = await request.json()

  if (action.name === 'create-hosting') {
    const host = await customersRepository.findById(action.payload.hostId)
    const accommodation = await accommodationsRepository.findById(
      action.payload.accomodationId,
    )
    if (host && accommodation) {
      console.log({  startDate: action.payload.startDate,
        endDate: action.payload.endDate,})
      const hosting = Hosting.create({
        accomodationId: action.payload.accomodationId,
        accomodationName: accommodation.name,
        hostId: action.payload.hostId,
        hostName: host.name,
        hostDocuments: host.documents.map((document) => document),
        hostDependentsCount: host.dependents.length,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      })
      await hostingsRepository.add(hosting.dto)
    }
  }

  if (action.name === 'update-hosting') {
    const host = await customersRepository.findById(action.payload.hostId)
    const accommodation = await accommodationsRepository.findById(
      action.payload.accomodationId,
    )
    if (host && accommodation) {
      const hosting = Hosting.create({
        id: action.payload.hostingId,
        accomodationId: action.payload.accomodationId,
        accomodationName: accommodation.name,
        hostId: action.payload.hostId,
        hostName: host.name,
        hostDocuments: host.documents.map((document) => document),
        hostDependentsCount: host.dependents.length,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      })
      await hostingsRepository.update(hosting.dto)
    }
  }

  if (action.name === 'delete-hosting') {
    await hostingsRepository.remove(action.payload.hostingId)
  }
}

const HostingsRoute = () => {
  return (
    <ActionContextProvider>
      <HostingsPage />
    </ActionContextProvider>
  )
}

export default HostingsRoute
