import { useLoaderData } from 'react-router'
import type { clientLoader } from '@/app/routes/accommodations'

import { H1 } from '@/ui/components/h1'
import { AccommodationsTable } from './accommodations-tale'

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
