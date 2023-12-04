import { createSignal } from 'solid-js'

import { createForm, isEmptyString, className as cn } from '@/shared/lib'

import { WatchingMonkeyEmoji, PasswordInput, SubmitButton } from './ui'

import type { Component } from 'solid-js'
import type { TValidation } from '@/shared/types'

interface IFormData { token: string }

const initialValues: IFormData = { token: '' }
const validation: TValidation<IFormData> = { token: value => !isEmptyString(value) }

export const SetupPage: Component = () => {
  const [showToken, setShowToken] = createSignal<boolean>(false)

  const { form, errors } = createForm<IFormData>({
    initialValues,
    validation,
    onSubmit: () => {},
  })

  const alert = (): boolean => errors().token

  return (
    <section class={ cn('flex justify-center items-center w-screen h-screen') }>
      <div class={ cn('flex flex-col h-1/2 items-center') }>
        <WatchingMonkeyEmoji watch={ showToken() } />

        <p class={ cn('flex flex-col gap-3 items-center mt-12 mb-12 text-3xl font-medium') }>
          Введите токен вашего бота

          <span
            class={ cn('text-base text-secondary-text-color font-normal') }
          >
            Токен нужен для связи приложения и Telegram
          </span>
        </p>

        <form class={ cn('flex flex-col gap-y-6 w-96') } { ...form }>
          <PasswordInput label="Токен" name="token" alert={ alert() } showPassword={ showToken() } onShowPasswordChange={ setShowToken } />

          <SubmitButton>
            Далее
          </SubmitButton>
        </form>
      </div>
    </section>
  )
}
