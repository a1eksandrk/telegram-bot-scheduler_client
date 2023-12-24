import { createSignal } from 'solid-js'
import { useNavigate } from '@solidjs/router'

import { WatchingMonkeyEmoji } from '@/entities/watching-moneky-emoji'
import { TokenAuthorizationForm } from '@/features/token-authorization'
import { className as cn } from '@/shared/lib'
import { router } from '@/shared/models'

import type { Component } from 'solid-js'

export const SetupPage: Component = () => {
  const [isTokenVisible, setIsTokenVisible] = createSignal<boolean>(false)

  const navigate = useNavigate()

  const navigateToChatsPage = (): void => { navigate(router.toChats()) }

  const authorizeToken = (token: string): void => {
    navigateToChatsPage()
  }

  return (
    <main class={ cn(
      'flex justify-center items-center w-d-screen h-d-screen pl-6 pr-6',
      'sm:p-0'
    ) }>
      <section class={ cn('flex flex-col w-full h-1/2 items-center') }>
        <WatchingMonkeyEmoji isWatching={ isTokenVisible() } />

        <p class={ cn('flex flex-col gap-3 items-center mt-12 mb-12 text-3xl text-center font-medium') }>
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
          onSubmit={ authorizeToken }
        />
      </section>
    </main>
  )
}
