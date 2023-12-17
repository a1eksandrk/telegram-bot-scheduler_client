import { createSignal } from 'solid-js'
import { IoMenuOutline } from 'solid-icons/io'

import { Header } from '@/widgets/header'
import { Chats } from '@/widgets/chats'
import { IconButton, Loader } from '@/shared/ui'
import { className as cn, useFetchedRouteData } from '@/shared/lib'

import { filterChatsList } from './lib'

import type { Component } from 'solid-js'
import type { IChatView } from '@/shared/types'

export { chatsData } from './model'

export const ChatsPage: Component = () => {
  const [search, setSearch] = createSignal<string>('')

  const [chats, isChatsLoading] = useFetchedRouteData<IChatView[]>()

  const filteredChatsList = (): IChatView[] => filterChatsList(chats(), search())

  return (
    <main class={ cn(
      'flex justify-center items-center w-d-screen h-d-screen',
      'dark:bg-[#181818]'
    ) }>
      <section class={ cn(
        'flex flex-col h-full w-[420px] border-l border-r border-border-color',
        'dark:border-none dark:bg-surface-color'
      ) }>
        <Header control={ <IconButton icon={ <IoMenuOutline /> } /> } onSearch={ setSearch } />

        <Loader isLoading={ isChatsLoading() }>
          <Chats class={ cn('grow') } items={ filteredChatsList() } />
        </Loader>
      </section>
    </main>
  )
}
