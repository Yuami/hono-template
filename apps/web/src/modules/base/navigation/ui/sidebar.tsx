import { FC, useCallback, useMemo } from 'react'
import { BoxIcon } from 'lucide-react'
import {
  NavigationItem,
  TeamItem,
} from '@/modules/base/navigation/service/navigation-service'
import { CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { BellIcon } from '@heroicons/react/24/outline'
import { NavigationUserMenu } from '@/modules/base/navigation/ui/navigation-user-menu'
import { User } from '@/modules/authentication/model/user-model'
import { MouseEvent } from 'react'
import { useAuth } from '@/modules/authentication/service/authentication-context/authentication-context'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const SidebarNavigationItem: FC<{
  showIcon?: boolean
  item: NavigationItem
  onClick: (e: MouseEvent<HTMLAnchorElement>) => void
  subItem?: boolean
}> = ({ item, onClick, showIcon = true, subItem = false }) => {
  const CaredIcon = useMemo(
    () => (item.active ? CaretDownIcon : CaretUpIcon),
    [item]
  )
  return (
    <li className={subItem ? 'ml-1' : ''}>
      <a
        onClick={onClick}
        href={item.href}
        className={classNames(
          item.active
            ? 'bg-muted text-primary'
            : 'flex items-center hover:bg-muted gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
        )}
      >
        {showIcon &&
          (item.icon ? (
            <item.icon
              className={classNames(
                item.active
                  ? 'text-primary'
                  : 'text-muted-foreground group-hover:text-primary',
                'h-6 w-6 shrink-0'
              )}
              aria-hidden="true"
            />
          ) : (
            <div className="w-6 h-6"></div>
          ))}
        <span>{item.name}</span>
        {item.includes && (
          <CaredIcon
            className={classNames(
              item.active ? 'mt-1' : 'mt-1',
              'ml-auto w-6 h-6'
            )}
          />
        )}
      </a>
    </li>
  )
}

type SidebarProps = {
  navigation: NavigationItem[]
  navigationFooter: NavigationItem[]
  teams: TeamItem[]
  user: User
  handleLogout?: (user: User) => void
}

export const Sidebar: FC<SidebarProps> = ({
  navigation,
  navigationFooter,
  teams,
  user,
  handleLogout,
}) => {
  const router = useRouter()
  const auth = useAuth()

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push(e.currentTarget.href)
  }

  const shouldDropdownOpen = useCallback((navigation: NavigationItem) => {
    return (
      navigation.includes &&
      (navigation.active || navigation.includes.some((item) => item.active))
    )
  }, [])

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center">
        <div className="flex w-full justify-between items-center">
          <div className="h-8 w-auto flex items-center font-bold gap-2">
            <BoxIcon />
            <div>Integracare</div>
          </div>
          <div className="flex">
            <NavigationUserMenu
              user={auth!.user!}
              handleLogout={auth!.logout}
            />
            <button
              type="button"
              className="p-2.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item, index) => {
                return (
                  <>
                    <SidebarNavigationItem
                      key={`navigation_item_${index}`}
                      item={item}
                      onClick={handleLinkClick}
                    />
                    {shouldDropdownOpen(item) && (
                      <div className="ml-5 border-l-gray-200 border-l flex-col flex gap-1">
                        {item.includes!.map((subItem, subindex) => (
                          <SidebarNavigationItem
                            key={`navigation_item_${index}_${subindex}`}
                            item={subItem}
                            onClick={handleLinkClick}
                            showIcon={false}
                            subItem
                          />
                        ))}
                      </div>
                    )}
                  </>
                )
              })}
            </ul>
          </li>
          <li>
            <div className="text-xs font-semibold leading-6 text-gray-400">
              Your teams
            </div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {teams.map((team) => (
                <li key={team.name}>
                  <a
                    onClick={handleLinkClick}
                    href={team.href}
                    className={classNames(
                      team.active
                        ? 'bg-muted text-primary'
                        : 'flex items-center hover:bg-muted gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    )}
                  >
                    <span
                      className={classNames(
                        team.active
                          ? 'bg-muted text-primary'
                          : 'flex items-center hover:bg-muted  gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all group-hover:text-primary group-hover:border-primary',
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                      )}
                    >
                      {team.initial}
                    </span>
                    <span className="truncate">{team.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <div className="mt-auto flex flex-col gap-1">
            {navigationFooter.map((item, index) => (
              <SidebarNavigationItem
                key={`footer_navigation_item_${index}`}
                item={item}
                onClick={handleLinkClick}
              />
            ))}
            <li className="block lg:hidden hover:bg-muted rounded">
              <NavigationUserMenu
                user={user}
                handleLogout={handleLogout}
                withName
              />
            </li>
          </div>
        </ul>
      </nav>
    </div>
  )
}
