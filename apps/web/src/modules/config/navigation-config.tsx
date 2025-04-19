'use client'
import {
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import {
  NavigationItem,
  TeamItem,
} from '@/modules/base/navigation/service/navigation-service'

export type UserNavigationItem = {
  name: string
  href: string
}

export const navigation: NavigationItem[] = [
  {
    name: (
      <FormattedMessage id="navigation_dashboard" defaultMessage="Dashboard" />
    ),
    href: '/dashboard',
    icon: HomeIcon,
    active: true,
    exact: true,
  },
  {
    name: <FormattedMessage id="navigation_teams" defaultMessage="Teams" />,
    href: '/dashboard/teams',
    icon: UsersIcon,
    active: false,
  },
  {
    name: (
      <FormattedMessage id="navigation_resources" defaultMessage="Resources" />
    ),
    href: '/dashboard/resources',
    icon: FolderIcon,
    active: false,
    includes: [
      {
        name: (
          <FormattedMessage
            id="navigation_patients"
            defaultMessage="Patients"
          />
        ),
        href: '/dashboard/patients',
        active: false,
      },
      {
        name: (
          <FormattedMessage id="navigation_centers" defaultMessage="Centers" />
        ),
        href: '/dashboard/centers',
        active: true,
      },
    ],
  },
  {
    name: (
      <FormattedMessage id="navigation_calendar" defaultMessage="Calendar" />
    ),
    href: '/dashboard/calendar',
    icon: CalendarIcon,
    active: false,
  },
  {
    name: (
      <FormattedMessage id="navigation_documents" defaultMessage="Documents" />
    ),
    href: '/dashboard/documents',
    icon: DocumentDuplicateIcon,
    active: false,
  },
  {
    name: <FormattedMessage id="navigation_reports" defaultMessage="Reports" />,
    href: '/dashboard/reports',
    icon: ChartPieIcon,
    active: false,
  },
  {
    name: <FormattedMessage id="navigation_tools" defaultMessage="Tools" />,
    href: '/dashboard/tools',
    icon: WrenchScrewdriverIcon,
    active: false,
  },
]

export const navigationFooter: NavigationItem[] = [
  {
    name: (
      <FormattedMessage id="navigation_settings" defaultMessage="Settings" />
    ),
    href: '/dashboard/settings',
    icon: Cog6ToothIcon,
    active: false,
  },
]

export const teams: TeamItem[] = [
  { name: 'DAC Manacor', href: '#', initial: 'M', active: false },
  { name: 'DAC Cala Millor', href: '#', initial: 'C', active: false },
]

export const userNavigation: UserNavigationItem[] = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]
