import { H1 } from 'ui/components/h1'
import { CustomersTable } from './customers-table'
import { useLoaderData } from 'react-router'
import type { clientLoader } from '~/routes/customers'
import { useCustomersPage } from './use-customers-page'

export const CustomersPageView = () => {
  const customers = useLoaderData<typeof clientLoader>()
  const { handleDeleteCustomer, handleCreateCustomer, handleUpdateCustomer } =
    useCustomersPage()

  return (
    <div>
      <H1>Clientes</H1>
      <div className='mt-4 w-full'>
        <CustomersTable
          customers={customers}
          hasDependents
          onDeleteCustomer={handleDeleteCustomer}
          onCreateCustomer={handleCreateCustomer}
          onUpdateCustomer={handleUpdateCustomer}
        />
      </div>
    </div>
  )
}
