import type { ReactNode } from 'react'

import type { Table as ReactTable } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'

import { Button } from '../button'
import { Input } from '../input'
import { Table } from '../table'

type Props<TData> = {
  table: ReactTable<TData>
  filterValue: string
  columnsCount: number
  newRowTrigger: ReactNode
  onFilterChange: (value: string) => void
}

export const DataTableView = <TData,>({
  table,
  columnsCount,
  filterValue,
  newRowTrigger,
  onFilterChange,
}: Props<TData>) => {
  return (
    <div className='rounded-md border p-6 max-w-[85vw] overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent'>
      <div className='flex items-center gap-3'>
        <Input
          placeholder='Pesquisar...'
          value={filterValue}
          onChange={(event) => onFilterChange(event.target.value)}
          className='max-w-sm'
        />
        {newRowTrigger}
      </div>
      <Table.Root className='mt-3 '>
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Table.Head key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </Table.Head>
                )
              })}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <Table.Row key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={columnsCount} className='h-24 text-center'>
                No results.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
      <div className='flex items-center justify-end space-x-2 mt-3'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próximo
        </Button>
      </div>
    </div>
  )
}
