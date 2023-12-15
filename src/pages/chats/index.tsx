import { createSignal } from 'solid-js'
import { IoMenuOutline } from 'solid-icons/io'

import { Header } from '@/widgets/header'
import { ChatsList } from '@/widgets/chats-list'
import { IconButton, Loader } from '@/shared/ui'
import { className as cn, useFetchedRouteData } from '@/shared/lib'

import type { Component } from 'solid-js'
import type { IChatItem } from '@/shared/types'

export { chatsData } from './model'

export const ChatsPage: Component = () => {
  const [search, setSearch] = createSignal<string>('')

  const [chatsList, isChatListLoading] = useFetchedRouteData<IChatItem[]>()

  const filteredChatsList = (): IChatItem[] | undefined => chatsList()?.filter(
    item => item.name.toLowerCase().includes(search().toLowerCase())
  )

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

        <Loader isLoading={ isChatListLoading() }>
          <ChatsList class={ cn('grow') } list={ filteredChatsList() } />
        </Loader>
      </section>
    </main>
  )
}
