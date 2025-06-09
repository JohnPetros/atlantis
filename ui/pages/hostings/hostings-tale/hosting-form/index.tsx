import { useLoaderData } from 'react-router'

import type { HostingDto } from 'core/dtos'
import { HostingFormView } from './hosting-form-view'
import type { clientLoader } from '~/routes/hostings'

type Props = {
  hostingId?: string
  onSubmit: (hostId: string, accomodationId: string) => Promise<void>
}

export const HostingForm = ({ hostingId, onSubmit }: Props) => {
  const data = useLoaderData<typeof clientLoader>()
  const hosting = data.hostings.find((hosting) => hosting.id === hostingId)

  return (
    <HostingFormView
      hosting={hosting}
      customers={data.customers}
      accommodations={data.accommodations}
      onSubmit={onSubmit}
    />
  )
}
