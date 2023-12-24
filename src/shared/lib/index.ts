import createForm from './create-form'
import className from './class-name'
import setProperty from './set-property'
import rippleClick from './ripple-click'
import useFetchedRouteData from './use-fetched-route-data'
import isEmptyString from './is-empty-string'

export * from './date-time'

export const isBoolean = (entity: unknown): entity is boolean => typeof entity === 'boolean'
export const isFunction = (entity: unknown): entity is ((...args: any) => any) => entity instanceof Function

export {
  createForm,
  className,
  setProperty,
  rippleClick,
  useFetchedRouteData,
  isEmptyString
}
