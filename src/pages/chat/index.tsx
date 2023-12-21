import { Switch, Match, createSignal } from 'solid-js'
import { useNavigate, Navigate } from '@solidjs/router'
import { BiRegularArrowBack } from 'solid-icons/bi'

import { Header } from '@/widgets/header'
import { Messages } from '@/widgets/messages'
import { SendMessage } from '@/features/send-message'

import { IconButton, Loader } from '@/shared/ui'
import { postMessage } from '@/shared/api'
import { className as cn, useFetchedRouteData } from '@/shared/lib'

import { filterMessages } from './lib'

import type { Component } from 'solid-js'
import type { IChat, IMessage, TMessageData } from '@/shared/types'

export { chatData } from './model'

const CHATS_PAGE_PATH = '/chats'

export const ChatPage: Component = () => {
  const [search, setSearch] = createSignal<string>('')

  const navigate = useNavigate()

  const [chat, { refetch }] = useFetchedRouteData<IChat>()

  const filteredMessages = (): IMessage[] | undefined => filterMessages(chat()?.messages, search())

  const navigateToChatsPage = (): void => { navigate(CHATS_PAGE_PATH) }

  const sendNewMessage = async (messageData: TMessageData): Promise<void> => {
    const currentChat = chat()

    if (!currentChat) return

    const chatId = currentChat.id

    await postMessage({ chatId, messageData })

    await refetch()
  }

  return (
    <main class={ cn(
      'flex justify-center items-center w-d-screen h-d-screen',
      'dark:bg-[#181818]'
    ) }>
      <section class={ cn(
        'flex flex-col h-full w-[500px] border-l border-r border-border-color',
        'dark:border-none dark:bg-surface-color'
      ) }>
        <Header control={ <IconButton icon={ <BiRegularArrowBack /> } onClick={ navigateToChatsPage } /> } onSearch={ setSearch } />

        <Switch>
          <Match when={ !chat.error && chat() }>
            <Messages class={ cn('grow') } messages={ filteredMessages() } />
          </Match>

          <Match when={ chat.loading }>
            <Loader isLoading class={ cn('grow') } />
          </Match>

          <Match when={ chat.error }>
            <Navigate href={ CHATS_PAGE_PATH } />
          </Match>
        </Switch>

        <SendMessage onSend={ sendNewMessage } />
      </section>
    </main>
  )
}
