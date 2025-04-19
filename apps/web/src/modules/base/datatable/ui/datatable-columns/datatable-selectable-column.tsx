import {
  ColumnDefWithName,
  ColumnStrategy,
} from '@/modules/base/datatable/ui/datatable-columns/datatable-columns'
import { ColumnDef, Row, Table } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import React from 'react'
import { useIntl } from 'react-intl'

type HeaderProps<T> = {
  table: Table<T>
}

const Header = <T,>({ table }: HeaderProps<T>) => {
  const intl = useIntl()
  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && 'indeterminate')
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label={intl.formatMessage({
        id: 'data_table_select_column_header_arial_label',
        defaultMessage: 'Select All',
      })}
    />
  )
}

type CellProps<T> = {
  row: Row<T>
}

const Cell = <T,>({ row }: CellProps<T>) => {
  const intl = useIntl()
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label={intl.formatMessage({
        id: 'data_table_select_column_row_arial_label',
        defaultMessage: 'Select Row',
      })}
    />
  )
}

export default class TableSelectableColumn<T> implements ColumnStrategy<T> {
  generate(): ColumnDefWithName<T> {
    return {
      id: 'select',
      header: ({ table }) => <Header table={table} />,
      cell: ({ row }) => <Cell row={row} />,
      enableSorting: false,
      enableHiding: false,
    }
  }
}
