import { useCallback, useEffect, useState } from 'react'
import integracareApi from '@/modules/base/service/integracare-api/integracare-api'
import { AxiosRequestConfig } from 'axios'

function useApiCall<T, U>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  config?: AxiosRequestConfig
) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [executeConfig, setExecuteConfig] = useState<AxiosRequestConfig | null>(
    null
  )

  const execute = useCallback(
    (execConfig: AxiosRequestConfig = {}, data?: U) => {
      setIsLoading(true)
      setExecuteConfig({ ...execConfig, data })
    },
    []
  )

  useEffect(() => {
    if (method !== 'get' && !executeConfig) return

    setIsLoading(true)
    const axiosConfig = { ...config, ...executeConfig, url, method }

    const fetchData = async () => {
      try {
        const response = await integracareApi(axiosConfig)
        setData(response.data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    if (method !== 'get') {
      setExecuteConfig(null)
    }
  }, [url, method, config, executeConfig])

  return { data, isLoading, error, execute }
}

// Exposing the useApi object with methods
const useApi = {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    useApiCall<T, unknown>('get', url, config),
  // eslint-disable-next-line react-hooks/rules-of-hooks
  post: <T, U>(url: string, config?: AxiosRequestConfig) =>
    useApiCall<T, U>('post', url, config),
  // eslint-disable-next-line react-hooks/rules-of-hooks
  put: <T, U>(url: string, config?: AxiosRequestConfig) =>
    useApiCall<T, U>('put', url, config),
  // eslint-disable-next-line react-hooks/rules-of-hooks
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    useApiCall<T, unknown>('delete', url, config),
}

export default useApi
