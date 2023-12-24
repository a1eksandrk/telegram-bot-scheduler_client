import { isEmptyString, convertDateToISO, getCurrentISO } from '@/shared/lib'

import type { TValidation } from '@/shared/types'
import type { ISendMessageForm } from './types'

const timeValudator = (value: string): boolean => {
  if (isEmptyString(value)) return false

  const ISODate = convertDateToISO(value)

  if (!ISODate) return false

  return Date.parse(ISODate) > Date.parse(getCurrentISO())
}

export const initialValues: ISendMessageForm = { text: '', time: '' }
export const validation: TValidation<ISendMessageForm> = {
  text: value => !isEmptyString(value),
  time: timeValudator
}
