import type { ColumnDef } from '@tanstack/react-table'
import type { ReactNode } from 'react'
import { DataTableView } from './datatable-view'
import { useDatatable } from './use-datable'

type Props<TData> = {
  data: TData[]
  newRowTrigger: ReactNode
  columns: ColumnDef<TData, any>[]
}

export const DataTable = <TData,>({ data, columns, newRowTrigger }: Props<TData>) => {
  const { table, filterValue, handleFilterChange } = useDatatable(data, columns)

  return (
    <DataTableView
      table={table}
      columnsCount={columns.length}
      filterValue={filterValue}
      onFilterChange={handleFilterChange}
      newRowTrigger={newRowTrigger}
    />
  )
}
