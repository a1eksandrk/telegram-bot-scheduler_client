import createForm from './create-form'
import className from './class-name'
import setProperty from './set-property'
import rippleClick from './ripple-click'

export const isBoolean = (entity: unknown): entity is boolean => typeof entity === 'boolean'
export const isEmptyString = (s: string): boolean => s.length === 0

export { createForm, className, setProperty, rippleClick }
