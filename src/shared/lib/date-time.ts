export const getCurrentISO = (): string => new Date().toISOString()

export const convertDateToISO = (date?: string): string | undefined => {
  if (!date) return

  const parsedTime = Date.parse(date)

  if (isNaN(parsedTime)) return

  const dateFromNumber = new Date(parsedTime)

  return dateFromNumber.toISOString()
}

export const convertISOToTime = (ISODate?: string, options?: Intl.DateTimeFormatOptions): string | undefined => {
  if (!ISODate) return

  const parsedTime = Date.parse(ISODate)

  if (isNaN(parsedTime)) return

  const dateFromNumber = new Date(parsedTime)

  return dateFromNumber.toLocaleTimeString([], options)
}

export const convertISOToDate = (ISODate?: string, options?: Intl.DateTimeFormatOptions): string | undefined => {
  if (!ISODate) return

  const parsedTime = Date.parse(ISODate)

  if (isNaN(parsedTime)) return

  const dateFromNumber = new Date(parsedTime)

  return dateFromNumber.toLocaleDateString([], options)
}
