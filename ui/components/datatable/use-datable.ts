import { useState } from 'react'
import type { ColumnDef, FilterFnOption, SortingState } from '@tanstack/react-table'
import {
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'

export function useDatatable<TData, TValue>(
  data: TData[],
  columns: ColumnDef<TData, TValue>[],
) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    filterFns: {
      fuzzy: (row, columnId, filterValue) => {
        const rowValue = row.getValue(columnId)
        const searchValue = filterValue.toLowerCase()
        return String(rowValue).toLowerCase().includes(searchValue)
      },
    },
    globalFilterFn: 'fuzzy' as FilterFnOption<TData>,
    state: {
      sorting,
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  })

  function handleFilterChange(value: string) {
    setGlobalFilter(value)
  }

  return {
    table,
    filterValue: globalFilter,
    handleFilterChange,
  }
}
