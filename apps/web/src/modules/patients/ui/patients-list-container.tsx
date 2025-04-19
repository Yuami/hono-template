'use client'
import { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import PatientTable from '@/modules/patients/ui/patient-table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GroupIcon } from 'lucide-react'

export const PatientsListContainer: FC = () => {
  return (
    <>
      <h1 className="text-lg font-semibold md:text-2xl mb-4">
        <FormattedMessage id="patients_title" defaultMessage="Patients" />
      </h1>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Patients
            </CardTitle>
            <GroupIcon />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">192</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Patients
            </CardTitle>
            <GroupIcon />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">192</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Patients
            </CardTitle>
            <GroupIcon />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">192</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Patients
            </CardTitle>
            <GroupIcon />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">192</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <PatientTable />
    </>
  )
}
