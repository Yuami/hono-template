import useApi from '@/modules/base/service/integracare-api-service/integracare-api-service'
import { useMemo } from 'react'
import { AxiosRequestConfig } from 'axios'

export function useUpdate<T, U>(baseResourceApiUrl: string, id: string) {
  const url = useMemo(
    () => `${baseResourceApiUrl}/${id}`,
    [baseResourceApiUrl, id]
  )
  const { execute, ...api } = useApi.put<T, U>(url)

  const updateResource = (data: U, createConfig: AxiosRequestConfig) => {
    return execute(createConfig, data)
  }

  return { updateResource, ...api }
}
