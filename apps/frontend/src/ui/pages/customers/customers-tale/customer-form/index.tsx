import { useLoaderData } from 'react-router'

import type { clientLoader } from '@/app/routes/customers'
import type { CustomerDto } from '@atlantis/core/dtos'
import { CustomerFormView } from './customer-form-view'
import { useActionContext } from '@/ui/hooks'

type Props = {
  customerId?: string
  isDependent: boolean
  onSubmit: (customer: CustomerDto) => Promise<void>
}

export const CustomerForm = ({ customerId, isDependent, onSubmit }: Props) => {
  const { isExecuting } = useActionContext()
  const data = useLoaderData<typeof clientLoader>()
  let customer: CustomerDto | undefined

  if (isDependent) {
    const dependents = data.flatMap((customer) => customer.dependents)
    customer = dependents.find((dependent) => dependent.id === customerId)
  } else {
    customer = data.find((customer) => customer.id === customerId)
  }

  return (
    <CustomerFormView
      customer={customer}
      isDependent={isDependent}
      isLoading={isExecuting}
      onSubmit={onSubmit}
    />
  )
}
