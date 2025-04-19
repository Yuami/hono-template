'use client'
import { useFindPatient } from '@/modules/patients/service/patients-api/patients-api'
import { useParams } from 'next/navigation'
import { Loading } from '@/modules/base/ui/loading/loading'
import { FormattedMessage } from 'react-intl'
import { PatientsCreateEdit } from '@/modules/patients/ui/patients-create-edit'

export const PatientsCreateEditContainer = () => {
  const { id } = useParams()
  const { data, isLoading, error } = useFindPatient(id as string)

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <h1 className="text-lg font-semibold md:text-2xl">
        <FormattedMessage id="patients_title" defaultMessage="Patients" />
      </h1>
      {!data ? (
        <div>
          <FormattedMessage
            id="patients_create_title"
            defaultMessage="Not Found"
          />
        </div>
      ) : (
        <PatientsCreateEdit patient={data} />
      )}
    </>
  )
}
