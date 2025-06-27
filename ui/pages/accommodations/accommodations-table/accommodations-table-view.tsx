import type { ColumnDef } from '@tanstack/react-table'
import {
  ArrowUpDown,
  MoreHorizontal,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from 'lucide-react'

import type { AccommodationDto } from 'core/dtos'
import { DataTable } from 'ui/components/datatable'
import { Button } from 'ui/components/button'
import { DropdownMenu } from 'ui/components/dropdown-menu'
import { FormDialog } from 'ui/components/form-dialog'
import { AlertMessageDialog } from 'ui/components/alert-message-dialog'
import { AccommodationForm } from './accomodation-form'

type AccommodationsTableData = {
  id: string
  name: string
  singleBeds: number
  coupleBeds: number
  suites: number
  garages: number
  hasAirConditioning: boolean
}

type Props = {
  accommodations: AccommodationDto[]
  onDeleteAccommodation: (accommodationId: string) => Promise<void>
  onCreateAccommodation: (accommodation: AccommodationDto) => Promise<void>
  onUpdateAccommodation: (accommodation: AccommodationDto) => Promise<void>
}

export const AccommodationsTableView = ({
  accommodations,
  onDeleteAccommodation,
  onCreateAccommodation,
  onUpdateAccommodation,
}: Props) => {
  const columns: ColumnDef<AccommodationsTableData>[] = [
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
                  <AccommodationForm
                    accommodationId={row.original.id}
                    onSubmit={onUpdateAccommodation}
                  />
                </FormDialog>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <AlertMessageDialog
                  onConfirm={() => onDeleteAccommodation(row.original.id)}
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
      accessorKey: 'singleBeds',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            size='sm'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Camas de solteiro
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div>{row.original.singleBeds}</div>
      },
    },
    {
      accessorKey: 'coupleBeds',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            size='sm'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Qtd. de camas de solteiro
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div>{row.original.coupleBeds}</div>
      },
    },
    {
      accessorKey: 'suites',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            size='sm'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Qtd. de camas de solteiro
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div>{row.original.suites}</div>
      },
    },
    {
      accessorKey: 'garages',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            size='sm'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Qtd. de garagens
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div>{row.original.garages}</div>
      },
    },
    {
      accessorKey: 'hasAirConditioning',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            size='sm'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Possui ar-condicionado?
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div>{row.original.hasAirConditioning ? 'Sim' : 'Não'}</div>
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
          <AccommodationForm onSubmit={onCreateAccommodation} />
        </FormDialog>
      }
      columns={columns}
      data={accommodations.map((accommodation) => ({
        id: accommodation.id,
        name: accommodation.name,
        singleBeds: accommodation.singleBeds,
        coupleBeds: accommodation.coupleBeds,
        suites: accommodation.suites,
        garages: accommodation.garages,
        hasAirConditioning: accommodation.hasAirConditioning,
      }))}
    />
  )
}
