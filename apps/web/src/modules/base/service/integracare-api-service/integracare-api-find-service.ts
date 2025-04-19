import { useMemo } from 'react'
import useApi from '@/modules/base/service/integracare-api-service/integracare-api-service'

export function useFind<T>(baseResourceApiUrl: string, id: string) {
  const url = useMemo(
    () => `${baseResourceApiUrl}/${id}`,
    [baseResourceApiUrl, id]
  )
  const { data, isLoading, error } = useApi.get<T>(url)

  return { data, isLoading, error }
}
