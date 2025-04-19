import TableTextColumn from '@/modules/base/datatable/ui/datatable-columns/datatable-text-column'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

type LinkGenerate<T> = ((rowValues: T) => string) | string

export default class TableLinkColumn<T> extends TableTextColumn<T> {
  constructor(
    href: LinkGenerate<T>,
    accessorKey: Extract<keyof T, string>,
    title: string,
    column?: Partial<ColumnDef<T>>
  ) {
    super(accessorKey, title, {
      cell: ({ row }) => {
        const link = typeof href === 'function' ? href(row.original) : href
        return (
          <Link href={link} className="underline">
            {row.getValue(accessorKey)}
          </Link>
        )
      },
      ...column,
    })
  }
}
