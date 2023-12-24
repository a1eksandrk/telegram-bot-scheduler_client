import { TokenInput } from '@/entities/token-input'
import { Button } from '@/shared/ui'
import { createForm, isEmptyString, className as cn } from '@/shared/lib'

import type { Component } from 'solid-js'
import type { TValidation } from '@/shared/types'

interface IFormData { token: string }

interface ITokenAuthorizationForm {
  isTokenVisible?: boolean
  onTokenVisibleChange?: (showToken: boolean) => void
  onSubmit?: (token: string) => void
}

const initialValues: IFormData = { token: '' }
const validation: TValidation<IFormData> = { token: value => !isEmptyString(value) }

export const TokenAuthorizationForm: Component<ITokenAuthorizationForm> = props => {
  const { form, errors } = createForm<IFormData>({
    initialValues,
    validation,
    onSubmit: ({ token }, errors) => {
      if (errors.token) return

      props.onSubmit?.(token)
    }
  })

  const alert = (): boolean => errors().token

  return (
    <form
      { ...form }
      class={ cn(
        'flex flex-col gap-y-6 w-full',
        'sm:w-96'
      ) }
    >
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
