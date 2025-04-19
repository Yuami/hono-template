import TableTextColumn from '@/modules/base/datatable/ui/datatable-columns/datatable-text-column'
import { ColumnDef } from '@tanstack/react-table'

export default class TableEmailColumn<T> extends TableTextColumn<T> {
  constructor(
    accessorKey: Extract<keyof T, string>,
    title: string,
    column?: Partial<ColumnDef<T>>
  ) {
    super(accessorKey, title, {
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue(accessorKey)}</div>
      ),
      ...column,
    })
  }
}
