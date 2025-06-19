import type { HostingDto } from '@atlantis/core/dtos'

import { HostingsTableView } from './hostings-table-view'
import { useActionContext } from '@/ui/hooks/use-action-context'

type Props = {
  hostings: HostingDto[]
  isLoading?: boolean
  onDeleteHosting: (hostingId: string) => Promise<void>
  onCreateHosting: (hostId: string, accomodationId: string) => Promise<void>
  onUpdateHosting: (hostId: string, accomodationId: string) => Promise<void>
}

export const HostingsTable = (props: Props) => {
  const { isExecuting } = useActionContext()
  return <HostingsTableView {...props} isLoading={isExecuting} />
}
