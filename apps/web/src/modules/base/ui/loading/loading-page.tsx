import { Loading, LoadingProps } from '@/modules/base/ui/loading/loading'
import { FC } from 'react'

export const LoadingPage: FC<LoadingProps> = (props) => {
  return (
    <div className="flex h-screen justify-center items-center">
      <Loading {...props} />
    </div>
  )
}
