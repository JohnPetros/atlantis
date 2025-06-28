import type { AccommodationDto } from '@atlantis/core/dtos'

import { AccommodationsTableView } from './accommodations-table-view'
import { useActionContext } from '@/ui/hooks/use-action-context'

type Props = {
  isLoading?: boolean
  accommodations: AccommodationDto[]
}

export const AccommodationsTable = (props: Props) => {
  const { isExecuting } = useActionContext()
  return <AccommodationsTableView {...props} isLoading={isExecuting} />
}
