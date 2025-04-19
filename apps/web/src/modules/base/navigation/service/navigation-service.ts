import { usePathname } from 'next/navigation'
import { ReactNode, useMemo } from 'react'

export type NavigationItem = {
  name: string | ReactNode
  icon?: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string
      titleId?: string
    } & React.RefAttributes<SVGSVGElement>
  >
  href: string
  includes?: NavigationItem[]
  active: boolean
  exact?: boolean
}

export type TeamItem = {
  name: string
  initial: string
  href: string
  includes?: TeamItem[]
  active: boolean
  exact?: boolean
}

export const useNavigation = <T extends NavigationItem | TeamItem>(
  initialNavigation: T[]
): T[] => {
  const pathName = usePathname()

  return useMemo(() => {
    return initialNavigation.map((item) => {
      const isActive = item.exact
        ? pathName === item.href
        : pathName.startsWith(item.href)
      return {
        ...item,
        active: isActive,
        includes: item.includes?.map((subItem) => ({
          ...subItem,
          active: pathName.startsWith(subItem.href),
        })),
      }
    })
  }, [initialNavigation, pathName])
}
