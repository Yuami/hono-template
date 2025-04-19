'use client'
import en from '@/translations/en.json'
import es from '@/translations/es.json'
import { useEffect, useState } from 'react'

export const messages = {
  en,
  es,
}

export const useLocale = (): {
  locale: string
  messages: { [key: string]: string }
} => {
  const [locale, setLocale] = useState('en')

  useEffect(() => {
    const browserLang = navigator?.language.split('-')[0] ?? 'en'
    const newLocale = messages.hasOwnProperty(browserLang) ? browserLang : 'en'
    if (newLocale !== locale) {
      setLocale(newLocale)
    }
  }, [locale])

  return { locale, messages: messages[locale as keyof typeof messages] }
}
