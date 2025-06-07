import type { CustomerDto } from 'core/dtos'
import { CustomerFormView } from './customer-form-view'
import { useLoaderData } from 'react-router'
import type { clientLoader } from '~/routes/customers'

type Props = {
  customerId?: string
  onSubmit: (customer: CustomerDto) => Promise<void>
}

export const CustomerForm = ({ customerId, onSubmit }: Props) => {
  const data = useLoaderData<typeof clientLoader>()
  const customer = data.find((customer) => customer.id === customerId)

  return <CustomerFormView customer={customer} onSubmit={onSubmit} />
}
