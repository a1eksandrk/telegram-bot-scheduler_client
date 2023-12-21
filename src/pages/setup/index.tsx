import { createSignal } from 'solid-js'

import { className as cn } from '@/shared/lib'
import { WatchingMonkeyEmoji } from '@/entities/watching-moneky-emoji'
import { TokenAuthorizationForm } from '@/features/token-authorization'

import type { Component } from 'solid-js'

export const SetupPage: Component = () => {
  const [isTokenVisible, setIsTokenVisible] = createSignal<boolean>(false)

  const handleSubmit = (token: string): void => {
    console.log(token)
  }

  return (
    <main class={ cn('flex justify-center items-center w-d-screen h-d-screen') }>
      <section class={ cn('flex flex-col h-1/2 items-center') }>
        <WatchingMonkeyEmoji isWatching={ isTokenVisible() } />

        <p class={ cn('flex flex-col gap-3 items-center mt-12 mb-12 text-3xl font-medium') }>
          Введите токен вашего бота

          <span
            class={ cn('text-base text-secondary-text-color font-normal') }
          >
            Токен нужен для связи приложения и Telegram
          </span>
        </p>

        <TokenAuthorizationForm
          isTokenVisible={ isTokenVisible() }
          onTokenVisibleChange={ setIsTokenVisible }
          onSubmit={ handleSubmit }
        />
      </section>
    </main>
  )
}
