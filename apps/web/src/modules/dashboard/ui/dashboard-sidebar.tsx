import {
  navigation as navigationConfig,
  navigationFooter as navigationFooterConfig,
  teams as teamsConfig,
} from '@/modules/config/navigation-config'
import { Sidebar } from '@/modules/base/navigation/ui/sidebar'
import { FC } from 'react'
import {
  NavigationItem,
  TeamItem,
  useNavigation,
} from '@/modules/base/navigation/service/navigation-service'
import { useAuth } from '@/modules/authentication/service/authentication-context/authentication-context'

export const DashboardSidebar: FC = () => {
  const auth = useAuth()
  const navigation = useNavigation<NavigationItem>(navigationConfig)
  const navigationFooter = useNavigation<NavigationItem>(navigationFooterConfig)
  const teams = useNavigation<TeamItem>(teamsConfig)

  return (
    <Sidebar
      navigation={navigation}
      navigationFooter={navigationFooter}
      teams={teams}
      user={auth!.user!}
      handleLogout={auth?.logout}
    />
  )
}
