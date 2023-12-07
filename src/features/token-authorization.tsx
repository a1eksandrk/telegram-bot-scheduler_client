import { TokenInput } from '@/entities/token-input'
import { Button } from '@/shared/ui'
import { createForm, isEmptyString, className as cn } from '@/shared/lib'

import type { Component } from 'solid-js'
import type { TValidation, TFormErrors } from '@/shared/types'

export type TTokenAuthorizationSubmitHandler = (values: IFormData, errors: TFormErrors<IFormData>) => void

interface IFormData { token: string }

interface ITokenAuthorizationForm {
  isTokenVisible?: boolean
  onTokenVisibleChange?: (showToken: boolean) => void
  onSubmit?: TTokenAuthorizationSubmitHandler
}

const initialValues: IFormData = { token: '' }
const validation: TValidation<IFormData> = { token: value => !isEmptyString(value) }

export const TokenAuthorizationForm: Component<ITokenAuthorizationForm> = props => {
  const { form, errors } = createForm<IFormData>({
    initialValues,
    validation,
    onSubmit: props.onSubmit
  })

  const alert = (): boolean => errors().token

  return (
    <form { ...form } class={ cn('flex flex-col gap-y-6 w-96') }>
      <TokenInput
        name="token"
        label="Токен"
        hasAlert={ alert() }
        isTokenVisible={ props.isTokenVisible }
        onTokenVisibleChange={ props.onTokenVisibleChange }
      />

      <Button type='submit'>
        Далее
      </Button>
    </form>
  )
}
