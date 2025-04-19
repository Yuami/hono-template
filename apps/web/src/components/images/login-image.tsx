import Image, { ImageProps } from 'next/image'
import { FC } from 'react'

const LoginImage: FC<Partial<ImageProps>> = (props) => {
  return (
    <Image
      src="/assets/login.svg"
      alt="abstract image"
      width="1920"
      height="1080"
      {...props}
    />
  )
}

export default LoginImage
