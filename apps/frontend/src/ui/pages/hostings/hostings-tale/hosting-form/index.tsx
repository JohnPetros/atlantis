import { useLoaderData } from 'react-router'

import { HostingFormView } from './hosting-form-view'
import type { clientLoader } from '@/app/routes/hostings'
import { useActionContext } from '@/ui/hooks'

type Props = {
  hostingId?: string
  onSubmit: (
    hostId: string,
    accomodationId: string,
    startDate: Date,
    endDate: Date,
    hostingId?: string,
  ) => Promise<void>
}

export const HostingForm = ({ hostingId, onSubmit }: Props) => {
  const { isExecuting } = useActionContext()
  const data = useLoaderData<typeof clientLoader>()
  const hosting = data.hostings.find((hosting) => hosting.id === hostingId)

  return (
    <HostingFormView
      hosting={hosting}
      customers={data.customers}
      accommodations={data.accommodations}
      isLoading={isExecuting}
      onSubmit={onSubmit}
    />
  )
}
