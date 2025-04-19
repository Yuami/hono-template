import { BoxIcon } from 'lucide-react'
import { FC, ReactNode } from 'react'

export type LoadingProps = {
  text?: ReactNode | string
}

export const Loading: FC<LoadingProps> = ({ text }) => {
  return (
    <div className="flex items-center flex-col gap-3">
      <BoxIcon className="animate-bounce h-20 w-20" />
      <span className="text-2xl font-semibold">{text}</span>
    </div>
  )
}
