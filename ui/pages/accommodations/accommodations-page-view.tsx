import { useLoaderData } from 'react-router'
import { H1 } from 'ui/components/h1'
import { useCustomersPage } from '../customers/use-customers-page'
import { AccommodationsTable } from './accommodations-tale'
import type { clientLoader } from '~/routes/accommodations'
import { useAccommodationsPage } from './use-accommodations-page'

export const AccommodationsPageView = () => {
  const accommodations = useLoaderData<typeof clientLoader>()
  const {
    handleDeleteAccommodation,
    handleCreateAccommodation,
    handleUpdateAccommodation,
  } = useAccommodationsPage()

  return (
    <div>
      <H1>Acomodações</H1>
      <div className='mt-4'>
        <AccommodationsTable
          accommodations={accommodations}
          onDeleteAccommodation={handleDeleteAccommodation}
          onCreateAccommodation={handleCreateAccommodation}
          onUpdateAccommodation={handleUpdateAccommodation}
        />
      </div>
    </div>
  )
}
