import useApi from '@/modules/base/service/integracare-api-service/integracare-api-service'
import { AxiosRequestConfig } from 'axios'

export function useCreate<T, U>(baseResourceApiUrl: string) {
  const { execute, ...api } = useApi.post<T, U>(baseResourceApiUrl)

  const createResource = (data: U, createConfig: AxiosRequestConfig) => {
    return execute(createConfig, data)
  }

  return { createResource, ...api }
}
