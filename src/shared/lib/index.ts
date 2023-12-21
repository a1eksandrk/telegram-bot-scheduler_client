import createForm from './create-form'
import className from './class-name'
import setProperty from './set-property'
import rippleClick from './ripple-click'
import useFetchedRouteData from './use-fetched-route-data'

export const isBoolean = (entity: unknown): entity is boolean => typeof entity === 'boolean'
export const isFunction = (entity: unknown): entity is ((...args: any) => any) => entity instanceof Function

const EMPTY_OR_WHITESPACE_ONLY = /^\s*$/

export const isEmptyString = (s: string): boolean => EMPTY_OR_WHITESPACE_ONLY.test(s)

export const getCurrentISODate = (): string => new Date().toISOString()

export const convertISODateToTime = (date?: string): string | undefined => {
  if (!date) return

  const parsedTime = Date.parse(date)

  if (isNaN(parsedTime)) return

  const dateFromNumber = new Date(parsedTime)

  return dateFromNumber.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export { createForm, className, setProperty, rippleClick, useFetchedRouteData }
