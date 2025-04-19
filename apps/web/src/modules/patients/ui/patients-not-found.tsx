import { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Button } from '@/components/ui/button'

const PatientsNotFound: FC = () => {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          <FormattedMessage
            id="patients_no_patients"
            defaultMessage="You have no patients"
          />
        </h3>
        <p className="text-sm text-muted-foreground">
          <FormattedMessage
            id="patients_no_patients_add_first"
            defaultMessage="Add your first patient to start"
          />
        </p>
        <Button className="mt-4">
          <FormattedMessage
            id="patients_add_patient_button"
            defaultMessage="Add patient"
          />
        </Button>
      </div>
    </div>
  )
}

export default PatientsNotFound
