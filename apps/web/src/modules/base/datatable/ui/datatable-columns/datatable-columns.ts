import { ColumnDef } from '@tanstack/react-table'

export type ColumnDefWithName<T> = ColumnDef<T> & { name?: string }

export interface ColumnStrategy<T> {
  generate(): ColumnDefWithName<T>
}

export const generateTableColumns = <T>(
  columns: ColumnStrategy<T>[]
): ColumnDefWithName<T>[] => {
  return columns.map((column) => column.generate())
}
