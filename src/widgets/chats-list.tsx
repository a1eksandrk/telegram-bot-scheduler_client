import { ChatItem, type IChatItem } from '@/entities/chat-item'
import { className as cn } from '@/shared/lib'

import { For, type Component } from 'solid-js'

interface IChatsListProps {
  list?: IChatItem[]
}

export const ChatsList: Component<IChatsListProps> = props => {
  return (
    <div class='overflow-auto'>
      <ul class={ cn('flex flex-col p-2') }>
        <For each={ props.list }>
          {
            item => (
              <li>
                <ChatItem item={ item } />
              </li>
            )
          }
        </For>
      </ul>
    </div>
  )
}
