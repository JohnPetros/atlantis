import type { ColumnDef } from '@tanstack/react-table'
import type { ReactNode } from 'react'
import { DataTableView } from './datatable-view'
import { useDatatable } from './use-datable'

type Props<TData> = {
  data: TData[]
  header: ReactNode
  columns: ColumnDef<TData, any>[]
}

export const DataTable = <TData,>({ data, columns, header }: Props<TData>) => {
  const { table, filterValue, handleFilterChange } = useDatatable(data, columns)

  return (
    <DataTableView
      table={table}
      columnsCount={columns.length}
      filterValue={filterValue}
      onFilterChange={handleFilterChange}
      header={header}
    />
  )
}
