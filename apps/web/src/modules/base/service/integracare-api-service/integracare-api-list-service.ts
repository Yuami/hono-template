import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useApi from '@/modules/base/service/integracare-api-service/integracare-api-service'

type ApiListParams = {
  page?: number
  filter?: Record<string, string | number>
}

type ApiListLinks = {
  first: string
  last: string
  prev: string | null
  next: string | null
}

type ApiListLink = {
  url?: string
  label: string
  active: boolean
}

export type ApiListMeta = {
  current_page: number
  from: number | null
  last_page: number
  links: ApiListLink[]
  path: string
  per_page: number
  to: number | null
  total: number
}

type ApiListResponse<T> = {
  data: T[] | null
  links: ApiListLinks
  meta: ApiListMeta
}

function useCurrentQueryParams() {
  const query = useSearchParams()
  return useCallback(() => new URLSearchParams(query), [query])
}

export function useList<T>(baseResourceApiUrl: string) {
  const { replace } = useRouter()
  const currentQueryParams = useCurrentQueryParams()
  const [params, setParams] = useState<ApiListParams>({})

  useEffect(() => {
    const paramsFromUrl = Object.fromEntries(currentQueryParams().entries())
    setParams(paramsFromUrl)
  }, [currentQueryParams])

  const buildQueryParams = useCallback(() => {
    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      queryParams.set(key, value.toString())
    })
    return queryParams
  }, [params])

  const buildUrl = useMemo(() => {
    const queryParams = buildQueryParams()
    return `${baseResourceApiUrl}?${queryParams.toString()}`
  }, [buildQueryParams, baseResourceApiUrl])

  useEffect(() => {
    const queryParams = buildQueryParams()
    replace(`${window.location.pathname}?${queryParams.toString()}`)
  }, [buildUrl, replace, buildQueryParams])

  const {
    data: response,
    isLoading,
    error,
  } = useApi.get<ApiListResponse<T>>(buildUrl)
  const { data, meta } = response ?? ({} as ApiListResponse<T>)

  const updateParams = useCallback((newParams: ApiListParams) => {
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }))
  }, [])

  return { data, isLoading, error, updateParams, meta }
}
