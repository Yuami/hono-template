import useApi from '@/modules/base/service/integracare-api-service/integracare-api-service'
import { useMemo } from 'react'

type DeleteApi = {
  message: string
}

export function useDelete(baseResourceApiUrl: string, id: string) {
  const url = useMemo(
    () => `${baseResourceApiUrl}/${id}`,
    [baseResourceApiUrl, id]
  )
  const { execute: deleteResource, ...api } = useApi.delete<DeleteApi>(url)

  return { deleteResource, ...api }
}
