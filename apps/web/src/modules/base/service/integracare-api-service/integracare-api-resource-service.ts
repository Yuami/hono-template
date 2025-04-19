import { useList } from '@/modules/base/service/integracare-api-service/integracare-api-list-service'
import { useFind } from '@/modules/base/service/integracare-api-service/integracare-api-find-service'
import { useCreate } from '@/modules/base/service/integracare-api-service/integracare-api-create-service'
import { useUpdate } from '@/modules/base/service/integracare-api-service/integracare-api-update-service'
import { useDelete } from '@/modules/base/service/integracare-api-service/integracare-api-delete-service'

type ApiResourceHooks<T, U> = {
  useList: () => ReturnType<typeof useList<T>>
  useFind: (id: string) => ReturnType<typeof useFind<T>>
  useCreate: () => ReturnType<typeof useCreate<T, U>>
  useUpdate: (id: string) => ReturnType<typeof useUpdate<T, Partial<U>>>
  useDelete: (id: string) => ReturnType<typeof useDelete>
}

function generateApiResourceHooks<T, U>(
  baseResourceUrl: string
): ApiResourceHooks<T, U> {
  return {
    useList: () => useList<T>(baseResourceUrl),
    useFind: (id: string) => useFind<T>(baseResourceUrl, id),
    useCreate: () => useCreate<T, U>(baseResourceUrl),
    useUpdate: (id: string) => useUpdate<T, Partial<U>>(baseResourceUrl, id),
    useDelete: (id: string) => useDelete(baseResourceUrl, id),
  }
}

export default generateApiResourceHooks
