import { createSignal } from 'solid-js'

import { setProperty } from '@/shared/lib'

import type { Accessor, JSX } from 'solid-js'
import type { IBaseFormType, TValidation, TFormErrors } from '@/shared/types'

interface IForm {
  onInput: JSX.InputEventHandler<HTMLFormElement, InputEvent>
  onSubmit: JSX.EventHandler<HTMLFormElement, Event>
}

interface IFormOptions<FormType extends IBaseFormType> {
  initialValues: FormType
  validation?: TValidation<FormType>
  onSubmit?: (values: FormType, errors: TFormErrors<FormType>) => void
}

interface IFormController<FormType extends IBaseFormType> {
  form: IForm
  values: Accessor<FormType>
  errors: Accessor<TFormErrors<FormType>>
}

const getInitialErrors = <FormType extends IBaseFormType>(values: FormType, initialValue?: boolean): TFormErrors<FormType> => {
  return Object.entries(values).reduce((errors, [name]) => {
    setProperty(errors, name, initialValue)

    return errors
  }, {} as TFormErrors<FormType>)
}

const validate = <FormType extends IBaseFormType>(values: FormType, validation?: TValidation<FormType>): TFormErrors<FormType> => {
  return Object.entries(values).reduce((errors, [name, value]) => {
    const validator = validation?.[name]

    const isInvalid: boolean | undefined = !validator?.(value)
    const error: boolean = isInvalid ?? false

    setProperty(errors, name, error)

    return errors
  }, {} as TFormErrors<FormType>)
}

const createForm = <FormType extends IBaseFormType>({ initialValues, validation, onSubmit }: IFormOptions<FormType>): IFormController<FormType> => {
  const [values, setValues] = createSignal<FormType>(initialValues)
  const [errors, setErrors] = createSignal<TFormErrors<FormType>>(getInitialErrors(initialValues, false))

  const handleInput: JSX.InputEventHandler<HTMLFormElement, InputEvent> = event => {
    event.preventDefault()

    const { target } = event

    if (!(target instanceof HTMLInputElement) && !(target instanceof HTMLTextAreaElement)) return

    const { name, value } = target

    setErrors(prev => ({ ...prev, [name]: false }))
    setValues(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit: JSX.EventHandler<HTMLFormElement, Event> = event => {
    event.preventDefault()

    const errors = validate(values(), validation)

    setErrors(prev => ({ ...prev, ...errors }))

    onSubmit?.(values(), errors)
  }

  return {
    form: {
      onInput: handleInput,
      onSubmit: handleSubmit
    },
    values,
    errors
  }
}

export default createForm
