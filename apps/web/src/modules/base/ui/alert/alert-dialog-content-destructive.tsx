import React, { FC } from 'react'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { FormattedMessage } from 'react-intl'

type AlertDeleteProps = {
  onAccept?: () => void
  onCancel?: () => void
}

export const AlertDialogContentDestructive: FC<AlertDeleteProps> = ({
  onAccept,
  onCancel,
}) => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          <FormattedMessage
            id={'alert_destructive_title'}
            defaultMessage={'Are you absolutely sure?'}
          />
        </AlertDialogTitle>
        <AlertDialogDescription>
          <FormattedMessage
            id={'alert_destructive_description'}
            defaultMessage={
              'This action cannot be undone. This will permanently delete your account and remove your data from our servers.'
            }
          />
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onCancel}>
          <FormattedMessage
            id={'alert_destructive_cancel'}
            defaultMessage={'Cancel'}
          />
        </AlertDialogCancel>
        <AlertDialogAction
          className={'bg-destructive hover:bg-destructive/90'}
          onClick={onAccept}
        >
          <FormattedMessage
            id={'alert_destructive_delete'}
            defaultMessage={'Delete'}
          />
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
