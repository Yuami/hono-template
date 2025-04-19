import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { FC, useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { useIntl } from 'react-intl'

type SingleDatePickerProps = {
  defaultDate?: Date
  onDateChange?: (date: Date | undefined) => void
}

export const SingleDatePicker: FC<SingleDatePickerProps> = ({
  defaultDate,
  onDateChange,
}) => {
  const { formatDate } = useIntl()
  const [date, setDate] = useState(defaultDate)

  const handleDateChange = (date: Date | undefined) => {
    onDateChange?.(date)
    setDate(date)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            formatDate(date, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
