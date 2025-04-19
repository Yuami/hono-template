'use client'

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { FormattedMessage } from 'react-intl'
import React from 'react'
import { ColumnDefWithName } from '@/modules/base/datatable/ui/datatable-columns/datatable-columns'

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
  columns: ColumnDefWithName<TData>[]
}

export function DataTableViewOptions<TData>({
  table,
  columns,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="hidden h-8 lg:flex">
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          <FormattedMessage
            id="datatable_columns_view"
            defaultMessage="Columns"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .map((column, index) => {
            return {
              column,
              component: (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {columns[index].name}
                </DropdownMenuCheckboxItem>
              ),
            }
          })
          .filter(({ column }) => column.getCanHide())
          .map(({ component }) => component)}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
