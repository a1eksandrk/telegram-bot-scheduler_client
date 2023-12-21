import { createSignal } from 'solid-js'

import { setProperty } from '@/shared/lib'

import type { Accessor, JSX } from 'solid-js'
import type { IBaseFormType, TValidation, TFormErrors } from '@/shared/types'

interface IForm {
  ref: (el: HTMLFormElement) => void
  onInput: JSX.InputEventHandler<HTMLFormElement, InputEvent>
  onSubmit: JSX.EventHandler<HTMLFormElement, Event>
  onReset: () => void
}

interface IFormOptions<FormType extends IBaseFormType> {
  initialValues: FormType
  validation?: TValidation<FormType>
  onInput?: (name: keyof FormType, value: string) => void
  onSubmit?: (values: FormType, errors: TFormErrors<FormType>) => void
  onReset?: () => void
}

interface IFormController<FormType extends IBaseFormType> {
  form: IForm
  formRef: Accessor<HTMLFormElement | undefined>
  values: Accessor<FormType>
  errors: Accessor<TFormErrors<FormType>>
}

const getInitialErrors = <FormType extends IBaseFormType>(values: FormType, initialValue?: boolean): TFormErrors<FormType> => {
  const initialErrors = {} as TFormErrors<FormType>

  return Object.entries(values).reduce<TFormErrors<FormType>>((errors, [name]) => {
    setProperty(errors, name, initialValue)

    return errors
  }, initialErrors)
}

const validate = <FormType extends IBaseFormType>(values: FormType, validation?: TValidation<FormType>): TFormErrors<FormType> => {
  const initialErrors = {} as TFormErrors<FormType>

  return Object.entries(values).reduce<TFormErrors<FormType>>((errors, [name, value]) => {
    const validator = validation?.[name]

    const isInvalid: boolean = !validator?.(value)
    const error: boolean = isInvalid ?? false

    setProperty(errors, name, error)

    return errors
  }, initialErrors)
}

const createForm = <FormType extends IBaseFormType>({ initialValues, validation, onInput, onSubmit, onReset }: IFormOptions<FormType>): IFormController<FormType> => {
  const [formRef, setFormRef] = createSignal<HTMLFormElement | undefined>()
  const [values, setValues] = createSignal<FormType>(initialValues)
  const [errors, setErrors] = createSignal<TFormErrors<FormType>>(getInitialErrors(initialValues, false))

  const handleInput: JSX.InputEventHandler<HTMLFormElement, InputEvent> = event => {
    event.preventDefault()

    const { target } = event

    if (!(target instanceof HTMLInputElement) && !(target instanceof HTMLTextAreaElement)) return

    const { name, value } = target

    setValues(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: false }))

    onInput?.(name, value)
  }

  const handleSubmit: JSX.EventHandler<HTMLFormElement, Event> = event => {
    event.preventDefault()

    const errors = validate(values(), validation)

    setErrors(prev => ({ ...prev, ...errors }))

    onSubmit?.(values(), errors)
  }

  const handleReset = (): void => {
    setValues(prev => ({ ...prev, ...initialValues }))
    setErrors(prev => ({ ...prev, ...getInitialErrors(initialValues, false) }))

    onReset?.()
  }

  return {
    form: {
      ref: setFormRef,
      onInput: handleInput,
      onSubmit: handleSubmit,
      onReset: handleReset
    },
    formRef,
    values,
    errors
  }
}

export default createForm
