import type { ColumnDef } from '@tanstack/react-table'
import {
  ArrowUpDown,
  MoreHorizontal,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from 'lucide-react'

import type { HostingDto } from '@atlantis/core/dtos'
import { DateFormatter, DocumentFormatter } from '@atlantis/core/formatters'

import { DataTable } from '@/ui/components/datatable'
import { Button } from '@/ui/components/button'
import { DropdownMenu } from '@/ui/components/dropdown-menu'
import { FormDialog } from '@/ui/components/form-dialog'
import { AlertMessageDialog } from '@/ui/components/alert-message-dialog'
import { HostingForm } from './hosting-form'

type HostingsTableData = {
  id: string
  accommodationName: string
  hostName: string
  hostDocuments: string
  hostDependentsCount: number
  startDate: string
  endDate: string
}

type Props = {
  isLoading: boolean
  hostings: HostingDto[]
  onDeleteHosting: (hostingId: string) => Promise<void>
  onCreateHosting: (
    hostId: string,
    accomodationId: string,
    startDate: Date,
    endDate: Date,
  ) => Promise<void>
  onUpdateHosting: (
    hostId: string,
    accomodationId: string,
    startDate: Date,
    endDate: Date,
    hostingId?: string,
  ) => Promise<void>
}

export const HostingsTableView = ({
  isLoading,
  hostings,
  onDeleteHosting,
  onCreateHosting,
  onUpdateHosting,
}: Props) => {
  const columns: ColumnDef<HostingsTableData>[] = [
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
                  title='Editar acomodação'
                  trigger={
                    <Button type='button' variant='ghost' className='justify-start'>
                      <PencilIcon className='h-3 w-3' />
                      Editar acomodação
                    </Button>
                  }
                >
                  <HostingForm hostingId={row.original.id} onSubmit={onUpdateHosting} />
                </FormDialog>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <AlertMessageDialog
                  onConfirm={() => onDeleteHosting(row.original.id)}
                  trigger={
                    <Button variant='ghost' className='justify-start'>
                      <TrashIcon className='h-4 w-4' />
                      Excluir acomodação
                    </Button>
                  }
                >
                  Tem certeza que deseja excluir a acomodação?
                </AlertMessageDialog>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Container>
        )
      },
    },
    {
      accessorKey: 'accommodationName',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            size='sm'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Acomodação
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div>{row.original.accommodationName}</div>
      },
    },
    {
      accessorKey: 'startDate',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            size='sm'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Data de início
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div>{DateFormatter.formatDateString(row.original.startDate)}</div>
      },
    },
    {
      accessorKey: 'endDate',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            size='sm'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Data de término
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div>{DateFormatter.formatDateString(row.original.endDate)}</div>
      },
    },
    {
      accessorKey: 'hostName',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            size='sm'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Cliente
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div>{row.original.hostName}</div>
      },
    },
    {
      accessorKey: 'hostDocuments',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            size='sm'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Documentos do cliente
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div>{row.original.hostDocuments}</div>
      },
    },
    {
      accessorKey: 'hostDependentsCount',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            size='sm'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Qtd. de dependentes do cliente
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div>{row.original.hostDependentsCount}</div>
      },
    },
  ]

  return (
    <DataTable
      newRowTrigger={
        <FormDialog
          title='Cadastrar acomodação'
          trigger={
            <Button variant='outline'>
              <PlusIcon className='h-4 w-4' />
              Cadastrar acomodação
            </Button>
          }
        >
          <HostingForm onSubmit={onCreateHosting} />
        </FormDialog>
      }
      columns={columns}
      isLoading={isLoading}
      data={hostings.map((hosting) => ({
        id: hosting.id,
        accommodationName: hosting.accomodationName,
        hostName: hosting.hostName,
        hostDocuments: hosting.hostDocuments
          .map((document) => DocumentFormatter.format(document.type, document.number))
          .join(' | '),
        hostDependentsCount: hosting.hostDependentsCount,
        startDate: hosting.startDate,
        endDate: hosting.endDate,
      }))}
    />
  )
}
