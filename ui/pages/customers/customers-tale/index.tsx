import { useLoaderData } from 'react-router'
import type { clientLoader } from '~/routes/customers'

import { CustomersTableView } from './custumers-table-view'
import { useCustomersTable } from './use-custumers-table'

export const CustomersTable = () => {
  const data = useLoaderData<typeof clientLoader>()
  const { handleDeleteCustomer, handleCreateCustomer, handleUpdateCustomer } =
    useCustomersTable()

  return (
    <CustomersTableView
      data={data}
      onDeleteCustomer={handleDeleteCustomer}
      onCreateCustomer={handleCreateCustomer}
      onUpdateCustomer={handleUpdateCustomer}
    />
  )
}
