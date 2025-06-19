import type { Route } from './+types/accommodations'

import { Accommodation } from '@atlantis/core/entities'
import { ActionContextProvider } from '@/ui/contexts/action-context'
import { AccommodationsPage } from '@/ui/pages/accommodations'
import { accommodationsService } from '@/services'

export const clientLoader = async () => {
  return await accommodationsService.getAllAccommodations()
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const action = await request.json()

  if (action.name === 'create-accommodation') {
    const accommodation = Accommodation.create(action.payload)
    const response = await accommodationsService.createAccommodation(accommodation.dto)
    if (!response.ok) {
      return { error: await response.json() }
    }
  }

  if (action.name === 'update-accommodation') {
    const accommodation = Accommodation.create(action.payload)
    const response = await accommodationsService.updateAccommodation(accommodation.dto)
    if (!response.ok) {
      return { error: await response.json() }
    }
  }

  if (action.name === 'delete-accommodation') {
    const response = await accommodationsService.deleteAccommodation(
      action.payload.accommodationId,
    )
    if (!response.ok) {
      return { error: await response.json() }
    }
  }
}

const AccommodationsRoute = () => {
  return (
    <ActionContextProvider>
      <AccommodationsPage />
    </ActionContextProvider>
  )
}

export default AccommodationsRoute
