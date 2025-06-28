import type { Route } from './+types/hostings'

import { ActionContextProvider } from '@/ui/contexts/action-context'
import { HostingsPage } from '@/ui/pages/hostings'
import { hostingsService } from '@/services'

import { customersService } from '@/services'
import { accommodationsService } from '@/services'

export const clientLoader = async () => {
  const hostings = await hostingsService.getAllHostings()
  const customers = await customersService.getAllCustomers()
  const accommodations = await accommodationsService.getAllAccommodations()
  return { hostings, customers, accommodations }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const action = await request.json()

  if (action.name === 'create-hosting') {
    const response = await hostingsService.createHosting(
      action.payload.accomodationId,
      action.payload.hostId,
      action.payload.startDate,
      action.payload.endDate,
    )
    if (!response.ok) {
      return { error: await response.json() }
    }
  }

  if (action.name === 'update-hosting') {
    const response = await hostingsService.updateHosting(
      action.payload.hostingId,
      action.payload.accomodationId,
      action.payload.hostId,
      action.payload.startDate,
      action.payload.endDate,
    )
    if (!response.ok) {
      return { error: await response.json() }
    }
  }

  if (action.name === 'delete-hosting') {
    const response = await hostingsService.deleteHosting(action.payload.hostingId)
    if (!response.ok) {
      return { error: await response.json() }
    }
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
