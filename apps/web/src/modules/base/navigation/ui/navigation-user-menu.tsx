import { FC, useCallback } from 'react'
import { User } from '@/modules/authentication/model/user-model'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserIcon } from 'lucide-react'

type NavigationUserMenuProps = {
  user: User | undefined
  handleLogout?: (user: User) => void
  withName?: boolean
}

export const NavigationUserMenu: FC<NavigationUserMenuProps> = ({
  user,
  handleLogout,
}) => {
  const onLogout = useCallback(() => {
    if (!user) return
    handleLogout?.(user)
  }, [handleLogout, user])

  return (
    <DropdownMenu>
      <div className="flex items-center">
        <DropdownMenuTrigger asChild>
          <Avatar className="hover:border-2 hover:border-primary h-6 w-6 cursor-pointer">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>
              <UserIcon className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {user?.name} {user?.last_name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
