import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import type { AccommodationDto } from '@atlantis/core/dtos'
import { DataTable } from '@/ui/components/datatable'
import { Button } from '@/ui/components/button'

type AccommodationsTableData = {
  id: string
  name: string
  singleBeds: number
  coupleBeds: number
  suites: number
  garages: number
  hostingsCount: number
  maxHostingsCount: number
  hasAirConditioning: boolean
}

type Props = {
  isLoading?: boolean
  accommodations: AccommodationDto[]
}

export const AccommodationsTableView = ({ isLoading = false, accommodations }: Props) => {
  const columns: ColumnDef<AccommodationsTableData>[] = [
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
    {
      accessorKey: 'maxHostingsCount',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            size='sm'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Qtd. de hospedagens ativas
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div>{row.original.hostingsCount}</div>
      },
    },
    {
      accessorKey: 'hostingsCount',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            size='sm'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Qtd. de hospedagens máxima
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div>{row.original.maxHostingsCount}</div>
      },
    },
  ]

  return (
    <DataTable
      newRowTrigger={null}
      columns={columns}
      isLoading={isLoading}
      data={accommodations.map((accommodation) => ({
        id: accommodation.id,
        name: accommodation.name,
        singleBeds: accommodation.singleBeds,
        coupleBeds: accommodation.coupleBeds,
        suites: accommodation.suites,
        garages: accommodation.garages,
        hostingsCount: accommodation.hostingsCount,
        maxHostingsCount: accommodation.maxHostingsCount,
        hasAirConditioning: accommodation.hasAirConditioning,
      }))}
    />
  )
}
