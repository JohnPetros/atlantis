import type { ColumnDef } from '@tanstack/react-table'

import { DataTable } from 'ui/components/datatable'
import { Button } from 'ui/components/button'
import {
  ArrowUpDown,
  MoreHorizontal,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from 'lucide-react'
import type { CustomerDto } from 'core/dtos'
import {
  AddressFormatter,
  CellphoneFormatter,
  DateFormatter,
  DocumentFormatter,
} from 'core/formatters'
import { DropdownMenu } from 'ui/components/dropdown-menu'
import { FormDialog } from 'ui/components/form-dialog'
import { CustomerForm } from './customer-form'
import { AlertMessageDialog } from 'ui/components/alert-message-dialog'
import { DependentsDialog } from '../dependents-dialog'

type CustomersTableData = {
  id: string
  name: string
  socialName: string
  birthDate: string
  registrationDate: string
  documents: string
  cellphones: string
  address: string
  dependents: CustomerDto[]
}

type Props = {
  customers: CustomerDto[]
  hasDependents?: boolean
  onDeleteCustomer: (customerId: string) => Promise<void>
  onCreateCustomer: (customer: CustomerDto) => Promise<void>
  onUpdateCustomer: (customer: CustomerDto) => Promise<void>
}

export const CustomersTableView = ({
  customers,
  hasDependents = false,
  onDeleteCustomer,
  onCreateCustomer,
  onUpdateCustomer,
}: Props) => {
  const columns: ColumnDef<CustomersTableData>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            size='sm'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Nome
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div>{row.original.name}</div>
      },
    },
    {
      accessorKey: 'socialName',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            size='sm'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Nome Social
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div>{row.original.socialName}</div>
      },
    },
    {
      accessorKey: 'birthDate',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            size='sm'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Data de Nascimento
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div>{DateFormatter.format(row.original.birthDate)}</div>
      },
    },
    {
      accessorKey: 'registrationDate',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            size='sm'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Data de Cadastro
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div>{DateFormatter.format(row.original.registrationDate)}</div>
      },
    },
    {
      accessorKey: 'documents',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            size='sm'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Documentos
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div>{row.original.documents}</div>
      },
    },
    {
      accessorKey: 'cellphones',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            size='sm'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Telefones
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div>{row.original.cellphones}</div>
      },
    },
    {
      accessorKey: 'address',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            size='sm'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Endereço
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div>{row.original.address}</div>
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu.Container>
            <DropdownMenu.Trigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Abrir menu de ações</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className='flex flex-col'>
              <DropdownMenu.Label>Ações</DropdownMenu.Label>
              <DropdownMenu.Item asChild>
                <FormDialog
                  title={hasDependents ? 'Editar cliente' : 'Editar dependente'}
                  trigger={
                    <Button type='button' variant='ghost' className='justify-start'>
                      <PencilIcon className='h-3 w-3' />
                      {hasDependents ? 'Editar cliente' : 'Editar dependente'}
                    </Button>
                  }
                >
                  <CustomerForm
                    customerId={row.original.id}
                    isDependent={!hasDependents}
                    onSubmit={onUpdateCustomer}
                  />
                </FormDialog>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <AlertMessageDialog
                  onConfirm={() => onDeleteCustomer(row.original.id)}
                  trigger={
                    <Button variant='ghost' className='justify-start'>
                      <TrashIcon className='h-4 w-4' />
                      Excluir {hasDependents ? 'cliente' : 'dependente'}
                    </Button>
                  }
                >
                  Tem certeza que deseja excluir o{' '}
                  {hasDependents ? 'cliente' : 'dependente'}?
                </AlertMessageDialog>
              </DropdownMenu.Item>
              {hasDependents && (
                <DropdownMenu.Item asChild>
                  <DependentsDialog
                    customerId={row.original.id}
                    dependents={row.original.dependents}
                  />
                </DropdownMenu.Item>
              )}
            </DropdownMenu.Content>
          </DropdownMenu.Container>
        )
      },
    },
  ]

  return (
    <DataTable
      newRowTrigger={
        <FormDialog
          title={hasDependents ? 'Cadastrar cliente' : 'Cadastrar dependente'}
          trigger={
            <Button variant='outline'>
              <PlusIcon className='h-4 w-4' />
              {hasDependents ? 'Cadastrar cliente' : 'Cadastrar dependente'}
            </Button>
          }
        >
          <CustomerForm isDependent={!hasDependents} onSubmit={onCreateCustomer} />
        </FormDialog>
      }
      columns={columns}
      data={customers.map((customer) => ({
        id: customer.id,
        name: customer.name,
        socialName: customer.socialName,
        birthDate: customer.birthDate,
        registrationDate: customer.registrationDate,
        documents: customer.documents
          .map((document) => DocumentFormatter.format(document.type, document.number))
          .join(' | '),
        cellphones: customer.cellphones
          .map((cellphone) => CellphoneFormatter.format(cellphone))
          .join(' | '),
        address: AddressFormatter.format(customer.address),
        dependents: customer.dependents,
      }))}
    />
  )
}
