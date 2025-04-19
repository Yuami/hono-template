import TableTextColumn from '@/modules/base/datatable/ui/datatable-columns/datatable-text-column'
import { ColumnDef } from '@tanstack/react-table'
import { FormattedDate } from 'react-intl'
import React from 'react'

export default class TableDateColumn<T> extends TableTextColumn<T> {
  constructor(
    accessorKey: Extract<keyof T, string>,
    title: string,
    column?: Partial<ColumnDef<T>>
  ) {
    super(accessorKey, title, {
      cell: ({ row }) => {
        return (
          <div>
            <FormattedDate
              year={'numeric'}
              month={'2-digit'}
              day={'2-digit'}
              value={row.getValue(accessorKey)}
            />
          </div>
        )
      },
      ...column,
    })
  }
}
