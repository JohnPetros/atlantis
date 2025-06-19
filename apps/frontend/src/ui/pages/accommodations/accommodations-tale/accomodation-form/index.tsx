import { useLoaderData } from 'react-router'

import type { AccommodationDto } from '@atlantis/core/dtos'

import type { clientLoader } from '@/app/routes/accommodations'
import { AccommodationFormView } from './accommodation-form-view'
import { useActionContext } from '@/ui/hooks/use-action-context'

type Props = {
  accommodationId?: string
  onSubmit: (accommodation: AccommodationDto) => Promise<void>
}

export const AccommodationForm = ({ accommodationId, onSubmit }: Props) => {
  const { isExecuting } = useActionContext()
  const data = useLoaderData<typeof clientLoader>()
  const accommodation = data.find((accommodation) => accommodation.id === accommodationId)

  return (
    <AccommodationFormView
      isLoading={isExecuting}
      accommodation={accommodation}
      onSubmit={onSubmit}
    />
  )
}
