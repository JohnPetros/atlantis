import { accommodationsRepository, hostingsRepository } from 'repositories'
import { ActionContextProvider } from 'ui/contexts/action-context'
import { AccommodationsPage } from 'ui/pages/accommodations'

export const clientLoader = async () => {
  const hostings = await hostingsRepository.findAll()
  return await accommodationsRepository.findAll(hostings)
}

const AccommodationsRoute = () => {
  return (
    <ActionContextProvider>
      <AccommodationsPage />
    </ActionContextProvider>
  )
}

export default AccommodationsRoute
