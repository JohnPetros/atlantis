import { useLoaderData } from 'react-router'

import type { AccommodationDto } from 'core/dtos'
import { AccommodationFormView } from './accommodation-form-view'
import type { clientLoader } from '~/routes/accommodations'

type Props = {
  accommodationId?: string
  onSubmit: (accommodation: AccommodationDto) => Promise<void>
}

export const AccommodationForm = ({ accommodationId, onSubmit }: Props) => {
  const data = useLoaderData<typeof clientLoader>()
  const accommodation = data.find((accommodation) => accommodation.id === accommodationId)

  return <AccommodationFormView accommodation={accommodation} onSubmit={onSubmit} />
}
