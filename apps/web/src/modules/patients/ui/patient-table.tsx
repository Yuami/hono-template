import React, { FC, useMemo } from 'react'
import { generateTableColumns } from '@/modules/base/datatable/ui/datatable-columns/datatable-columns'
import TableSelectableColumn from '@/modules/base/datatable/ui/datatable-columns/datatable-selectable-column'
import TableEmailColumn from '@/modules/base/datatable/ui/datatable-columns/datatable-email-column'
import TableTextColumn from '@/modules/base/datatable/ui/datatable-columns/datatable-text-column'
import { useIntl } from 'react-intl'
import TableActionsColumn from '@/modules/base/datatable/ui/datatable-columns/datatable-actions-column'
import Table from '@/modules/base/datatable/ui/datatable-table'
import TableLinkColumn from '@/modules/base/datatable/ui/datatable-columns/datatable-link-column'
import TableDateColumn from '@/modules/base/datatable/ui/datatable-columns/datatable-date-column'
import { PATIENTS_API_PATH } from '@/modules/patients/service/patients-api/patients-api-config'

const PatientTable: FC = () => {
  const { formatMessage } = useIntl()
  const createLink = (patient: Patient) => `/dashboard/patients/${patient.id}`

  const columns = useMemo(
    () =>
      generateTableColumns<Patient>([
        new TableSelectableColumn<Patient>(),
        new TableLinkColumn<Patient>(
          createLink,
          'legal_id',
          formatMessage({
            id: 'patients_table_legal_id',
            defaultMessage: 'DNI',
          })
        ),
        new TableTextColumn<Patient>(
          'name',
          formatMessage({ id: 'patients_table_name', defaultMessage: 'Name' }),
          {
            cell: ({ row }) => (
              <div className="capitalize">{`${row.getValue('name')} ${row.original.last_name}`}</div>
            ),
          }
        ),
        new TableEmailColumn<Patient>(
          'email',
          formatMessage({ id: 'patients_table_email', defaultMessage: 'Email' })
        ),
        new TableTextColumn<Patient>(
          'phone',
          formatMessage({ id: 'patients_table_phone', defaultMessage: 'Phone' })
        ),
        new TableDateColumn<Patient>(
          'birth_date',
          formatMessage({
            id: 'patients_table_birth_date',
            defaultMessage: 'Birth Date',
          })
        ),
        new TableActionsColumn(),
      ]),
    [formatMessage]
  )

  return (
    <Table<Patient> columns={columns} baseResourceUrl={PATIENTS_API_PATH} />
  )
}

export default PatientTable
