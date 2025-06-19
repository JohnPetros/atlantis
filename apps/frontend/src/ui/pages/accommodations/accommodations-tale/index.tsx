import type { AccommodationDto } from '@atlantis/core/dtos'

import { AccommodationsTableView } from './accommodations-table-view'
import { useActionContext } from '@/ui/hooks/use-action-context'

type Props = {
  isLoading?: boolean
  accommodations: AccommodationDto[]
  onDeleteAccommodation: (accommodationId: string) => Promise<void>
  onCreateAccommodation: (accommodation: AccommodationDto) => Promise<void>
  onUpdateAccommodation: (accommodation: AccommodationDto) => Promise<void>
}

export const AccommodationsTable = (props: Props) => {
  const { isExecuting } = useActionContext()
  return <AccommodationsTableView {...props} isLoading={isExecuting} />
}
