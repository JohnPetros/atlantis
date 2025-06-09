import type { Route } from './+types/accommodations'

import { Accommodation } from 'core/entities/Accommodation'
import { accommodationsRepository } from 'repositories'
import { ActionContextProvider } from 'ui/contexts/action-context'
import { AccommodationsPage } from 'ui/pages/accommodations'

export const clientLoader = async () => {
  return await accommodationsRepository.findAll()
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const action = await request.json()

  if (action.name === 'create-accommodation') {
    const accommodation = Accommodation.create(action.payload)
    await accommodationsRepository.add(accommodation.dto)
  }

  if (action.name === 'update-accommodation') {
    const accommodation = Accommodation.create(action.payload)
    await accommodationsRepository.update(accommodation.dto)
  }

  if (action.name === 'delete-accommodation') {
    await accommodationsRepository.remove(action.payload.accommodationId)
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
