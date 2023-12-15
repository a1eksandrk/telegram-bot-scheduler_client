import { useNavigate, useParams } from '@solidjs/router'
import { IoArrowBackOutline } from 'solid-icons/io'

import { Header } from '@/widgets/header'
import { IconButton } from '@/shared/ui'
import { className as cn } from '@/shared/lib'

import type { Component } from 'solid-js'

type TChatPageParams = {
  id: string
}

export const ChatPage: Component = () => {
  const params = useParams<TChatPageParams>()
  const navigate = useNavigate()

  const navigateToChats = (): void => { navigate('/chats') }

  return (
    <main class={ cn(
      'flex justify-center items-center w-d-screen h-d-screen',
      'dark:bg-[#181818]'
    ) }>
      <section class={ cn(
        'flex flex-col h-full w-[420px] border-l border-r border-border-color',
        'dark:border-none dark:bg-surface-color'
      ) }>
        <Header control={ <IconButton icon={ <IoArrowBackOutline /> } onClick={ navigateToChats } /> } />

        <div>Id: { params.id }</div>
      </section>
    </main>
  )
}
