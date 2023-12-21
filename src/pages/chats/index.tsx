import { Switch, Match, createSignal } from 'solid-js'
import { BiRegularMenu } from 'solid-icons/bi'

import { Header } from '@/widgets/header'
import { Chats } from '@/widgets/chats'
import { IconButton, Loader } from '@/shared/ui'
import { className as cn, useFetchedRouteData } from '@/shared/lib'

import { filterChats } from './lib'

import type { Component } from 'solid-js'
import type { IChat } from '@/shared/types'

export { chatsData } from './model'

export const ChatsPage: Component = () => {
  const [search, setSearch] = createSignal<string>('')

  const [chats] = useFetchedRouteData<IChat[]>()

  const filteredChatsList = (): IChat[] => filterChats(chats(), search())

  return (
    <main class={ cn(
      'flex justify-center items-center w-d-screen h-d-screen',
      'dark:bg-[#181818]'
    ) }>
      <section class={ cn(
        'flex flex-col h-full w-[500px] border-l border-r border-border-color',
        'dark:border-none dark:bg-surface-color'
      ) }>
        <Header control={ <IconButton icon={ <BiRegularMenu /> } /> } onSearch={ setSearch } />

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
