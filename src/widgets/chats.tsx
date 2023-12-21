import { For } from 'solid-js'

import { Chat } from '@/entities/chat'
import { className as cn } from '@/shared/lib'

import type { Component } from 'solid-js'
import type { IChat } from '@/shared/types'

interface IChatsProps {
  class?: string
  chats?: IChat[]
}

export const Chats: Component<IChatsProps> = props => {
  return (
    <div class={ cn('overflow-auto', props.class) }>
      <ul class={ cn('flex flex-col p-2') }>
        <For each={ props.chats }>
          {
            chat => (
              <li>
                <Chat chat={ chat } />
              </li>
            )
          }
        </For>
      </ul>
    </div>
  )
}
