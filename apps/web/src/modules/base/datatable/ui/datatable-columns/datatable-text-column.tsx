import {
  ColumnDefWithName,
  ColumnStrategy,
} from '@/modules/base/datatable/ui/datatable-columns/datatable-columns'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { DataTableColumnHeader } from '@/modules/base/datatable/ui/datatable-header-column-header'

export default class TableTextColumn<T> implements ColumnStrategy<T> {
  constructor(
    private accessorKey: Extract<keyof T, string>,
    private title: string,
    private column?: Partial<ColumnDef<T>>
  ) {}

  generate(): ColumnDefWithName<T> {
    return {
      name: this.title,
      accessorKey: this.accessorKey,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={this.title} />
      ),
      cell: ({ row }) => {
        return <div>{row.getValue(this.accessorKey)}</div>
      },
      ...this.column,
    }
  }
}
