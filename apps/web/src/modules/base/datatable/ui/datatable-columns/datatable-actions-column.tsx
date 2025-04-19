import { ColumnStrategy } from '@/modules/base/datatable/ui/datatable-columns/datatable-columns'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { AlertDialogContentDestructive } from '@/modules/base/ui/alert/alert-dialog-content-destructive'
import { FormattedMessage } from 'react-intl'

const Cell = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <FormattedMessage id="datatable_actions_view" defaultMessage="View" />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <FormattedMessage id="datatable_actions_edit" defaultMessage="Edit" />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <AlertDialog>
            <AlertDialogTrigger>
              <FormattedMessage
                id="datatable_actions_delete"
                defaultMessage="Delete"
              />
            </AlertDialogTrigger>
            <AlertDialogContentDestructive />
          </AlertDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default class TableActionsColumn<T> implements ColumnStrategy<T> {
  generate(): ColumnDef<T> {
    return {
      id: 'actions',
      cell: () => <Cell />,
      enableSorting: false,
      enableHiding: false,
    }
  }
}
