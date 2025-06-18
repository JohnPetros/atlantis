import { CustomersTableView } from './custumers-table-view'
import type { CustomerDto } from '@atlantis/core/dtos'
import { useActionContext } from '@/ui/hooks/use-action-context'

type Props = {
  customers: CustomerDto[]
  hasDependents?: boolean
  isLoading?: boolean
  onDeleteCustomer: (customerId: string) => Promise<void>
  onCreateCustomer: (customer: CustomerDto) => Promise<void>
  onUpdateCustomer: (customer: CustomerDto) => Promise<void>
}

export const CustomersTable = (props: Props) => {
  const { isExecuting } = useActionContext()
  return <CustomersTableView {...props} isLoading={isExecuting} />
}
