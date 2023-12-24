import { Switch, Match, createSignal } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { BiRegularExit } from 'solid-icons/bi'

import { Chats } from '@/widgets/chats'
import { Header } from '@/entities/header'
import { IconButton, Loader } from '@/shared/ui'
import { className as cn, useFetchedRouteData } from '@/shared/lib'
import { router } from '@/shared/models'

import { filterChats } from './lib'

import type { Component } from 'solid-js'
import type { IChat } from '@/shared/types'

export { chatsData } from './model'

export const ChatsPage: Component = () => {
  const [search, setSearch] = createSignal<string>('')

  const navigate = useNavigate()

  const [chats] = useFetchedRouteData<IChat[]>()

  const filteredChatsList = (): IChat[] => filterChats(chats(), search())

  const disconnectToken = (): void => { navigate(router.toSetup()) }

  return (
    <main class={ cn(
      'flex justify-center items-center w-d-screen h-d-screen',
      'dark:bg-[#181818]'
    ) }>
      <section class={ cn(
        'flex flex-col h-full w-full border-l border-r border-border-color',
        'dark:border-none dark:bg-surface-color',
        'sm:w-[640px]'
      ) }>
        <Header control={ <IconButton icon={ <BiRegularExit /> } onClick={ disconnectToken } /> } onSearch={ setSearch } />

        <Switch>
          <Match when={ !chats.error && chats() }>
            <Chats class={ cn('grow') } chats={ filteredChatsList() } />
          </Match>

          <Match when={ chats.loading }>
            <Loader isLoading class={ cn('grow') } />
          </Match>
        </Switch>
      </section>
    </main>
  )
}
