import { H1 } from 'ui/components/h1'
import { CustomersTable } from './customers-tale'

export const CustomersPageView = () => {
  return (
    <div>
      <H1>Clientes</H1>
      <div className='mt-4'>
        <CustomersTable />
      </div>
    </div>
  )
}
