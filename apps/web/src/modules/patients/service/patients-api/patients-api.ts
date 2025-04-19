import { PATIENTS_API_PATH } from '@/modules/patients/service/patients-api/patients-api-config'
import generateApiResourceHooks from '@/modules/base/service/integracare-api-service/integracare-api-resource-service'

const {
  useList: usePatientsList,
  useFind: useFindPatient,
  useCreate: useCreatePatient,
  useUpdate: useUpdatePatient,
  useDelete: useDeletePatient,
} = generateApiResourceHooks<Patient, Omit<Patient, 'id'>>(PATIENTS_API_PATH)

export {
  usePatientsList,
  useFindPatient,
  useCreatePatient,
  useUpdatePatient,
  useDeletePatient,
}
