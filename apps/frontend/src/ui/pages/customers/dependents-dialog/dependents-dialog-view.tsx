import type { CustomerDto } from 'core/dtos'
import { Button } from 'ui/components/button'
import { Dialog } from 'ui/components/dialog'
import { CustomersTable } from '../customers-tale'
import { User } from 'lucide-react'

type Props = {
  dependents: CustomerDto[]
  onDeleteCustomer: (customerId: string) => Promise<void>
  onCreateCustomer: (customer: CustomerDto) => Promise<void>
  onUpdateCustomer: (customer: CustomerDto) => Promise<void>
}

export const DependentDialogView = ({
  dependents,
  onDeleteCustomer,
  onCreateCustomer,
  onUpdateCustomer,
}: Props) => {
  return (
    <Dialog.Container>
      <Dialog.Trigger asChild>
        <Button variant='ghost' className='justify-start'>
          <User />
          Ver dependentes
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className='w-[80rem] max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent'>
        <Dialog.Header>
          <Dialog.Title>Dependentes</Dialog.Title>
        </Dialog.Header>
        <CustomersTable
          customers={dependents}
          hasDependents={false}
          onDeleteCustomer={onDeleteCustomer}
          onCreateCustomer={onCreateCustomer}
          onUpdateCustomer={onUpdateCustomer}
        />
      </Dialog.Content>
    </Dialog.Container>
  )
}
