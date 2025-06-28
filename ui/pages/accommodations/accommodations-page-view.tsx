import { useLoaderData } from 'react-router'
import { H1 } from 'ui/components/h1'
import { AccommodationsTable } from './accommodations-table'
import type { clientLoader } from '~/routes/accommodations'

export const AccommodationsPageView = () => {
  const accommodations = useLoaderData<typeof clientLoader>()

  return (
    <div>
      <H1>Acomodações</H1>
      <div className='mt-4'>
        <AccommodationsTable accommodations={accommodations} />
      </div>
    </div>
  )
}
