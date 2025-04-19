import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  TableOptions,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CircleIcon } from 'lucide-react'
import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination } from '@/modules/base/datatable/ui/datatable-pagination'
import { ColumnDefWithName } from '@/modules/base/datatable/ui/datatable-columns/datatable-columns'
import { FormattedMessage, useIntl } from 'react-intl'
import { useList } from '@/modules/base/service/integracare-api-service/integracare-api-list-service'
import { Loading } from '@/modules/base/ui/loading/loading'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { DataTableViewOptions } from '@/modules/base/datatable/ui/datatable-view-options'
import { DataTableFacetedFilter } from '@/modules/base/datatable/ui/data-table-faceted-filter'
import {
  CheckCircledIcon,
  CrossCircledIcon,
  PlusCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons'

export type Pagination = {
  nextPage: () => void
  previousPage: () => void
  firstPage: () => void
  lastPage: () => void
}

type TableProps<T> = {
  columns: ColumnDefWithName<T>[]
  tableOptions?: Partial<Omit<TableOptions<T>, 'data' | 'columns'>>
  baseResourceUrl: string
}

const Table = <T,>({
  columns,
  tableOptions,
  baseResourceUrl,
}: TableProps<T>) => {
  const { data, isLoading } = useList<T>(baseResourceUrl)
  const { formatMessage } = useIntl()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data: data ?? [],
    columns,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    ...tableOptions,
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center pb-4 gap-2">
          <Input
            placeholder={formatMessage({
              id: 'datatable_search',
              defaultMessage: 'Search',
            })}
            value={globalFilter ?? ''}
            onChange={(e) => setGlobalFilter(String(e.target.value))}
            className="w-[150px] lg:w-[250px] h-8"
          />
          {table.getColumn('email') && (
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              title="Status"
              options={[
                {
                  value: 'backlog',
                  label: 'Backlog',
                  icon: QuestionMarkCircledIcon,
                },
                {
                  value: 'todo',
                  label: 'Todo',
                  icon: CircleIcon,
                },
                {
                  value: 'in progress',
                  label: 'In Progress',
                  icon: StopwatchIcon,
                },
                {
                  value: 'done',
                  label: 'Done',
                  icon: CheckCircledIcon,
                },
                {
                  value: 'canceled',
                  label: 'Canceled',
                  icon: CrossCircledIcon,
                },
              ]}
            />
          )}
          <div className="flex ml-auto gap-2">
            <DataTableViewOptions table={table} columns={columns} />
            <Button size="sm" className="ml-auto h-8">
              <PlusCircledIcon className="mr-2 h-4 w-4" />
              <span>Añadir paciente</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <TableComponent>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={
                        header.column.id === 'actions' ? 'p-1 w-5' : ''
                      }
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          {isLoading ? (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-96 text-center"
                >
                  <Loading />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cell.id === 'actions' ? 'p-1  w-5' : ''}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <FormattedMessage
                      id={'datatable_no_results'}
                      defaultMessage={'No results.'}
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </TableComponent>
        <div className="py-4">
          <DataTablePagination table={table} />
        </div>
      </CardContent>
    </Card>
  )
}

export default Table
