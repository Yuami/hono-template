import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { FormattedMessage } from 'react-intl'
import { Pagination } from '@/modules/base/datatable/ui/datatable-table'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  pagination?: Pagination
}

export function DataTablePagination<TData>({
  table,
  pagination,
}: DataTablePaginationProps<TData>) {
  const { nextPage, previousPage, firstPage, lastPage } = pagination || {}

  const handleFirstPage = () => {
    firstPage?.()
    table.setPageIndex(0)
  }

  const handlePreviousPage = () => {
    previousPage?.()
    table.previousPage()
  }

  const handleNextPage = () => {
    nextPage?.()
    table.nextPage()
  }

  const handleLastPage = () => {
    lastPage?.()
    table.setPageIndex(table.getPageCount() - 1)
  }

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        <FormattedMessage
          id={'datatable_total_rows'}
          defaultMessage={
            '{row} of {rows, plural, =0 {rows} one {# row} other {# rows}}'
          }
          values={{
            row: table.getFilteredSelectedRowModel().rows.length,
            rows: table.getFilteredRowModel().rows.length,
          }}
        />
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">
            <FormattedMessage
              id={'datatable_rows_per_page'}
              defaultMessage={'Rows per page'}
            />
          </p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center text-sm font-medium">
          <FormattedMessage
            id={'datatable_pages'}
            defaultMessage={'Page {page} of {pages}'}
            values={{
              page: table.getState().pagination.pageIndex + 1,
              pages: table.getPageCount(),
            }}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={handleFirstPage}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">
              <FormattedMessage
                id={'datatable_go_to_first_page'}
                defaultMessage={'Go to first page'}
              />
            </span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handlePreviousPage}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">
              <FormattedMessage
                id={'datatable_go_to_previous_page'}
                defaultMessage={'Go to previous page'}
              />
            </span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={handleNextPage}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">
              <FormattedMessage
                id={'datatable_go_to_next_page'}
                defaultMessage={'Go to next page'}
              />
            </span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={handleLastPage}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">
              <FormattedMessage
                id={'datatable_go_to_next_page'}
                defaultMessage={'Go to last page'}
              />
            </span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
