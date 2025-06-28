import { ActionContextProvider } from '@/ui/contexts/action-context'
import { AccommodationsPage } from '@/ui/pages/accommodations'
import { accommodationsService } from '@/services'

export const clientLoader = async () => {
  return await accommodationsService.getAllAccommodations()
}

const AccommodationsRoute = () => {
  return (
    <ActionContextProvider>
      <AccommodationsPage />
    </ActionContextProvider>
  )
}

export default AccommodationsRoute
