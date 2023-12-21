import { For, createEffect, onMount, on } from 'solid-js'

import { Message } from '@/entities/message'
import { className as cn } from '@/shared/lib'

import type { Component } from 'solid-js'
import type { IMessage } from '@/shared/types'

interface IMessagesProps {
  class?: string
  messages?: IMessage[]
}

const scrollToBottom = (listElement?: HTMLUListElement, behavior?: ScrollBehavior): void => {
  if (!listElement) return

  listElement.scrollIntoView({ block: 'end', behavior })
}

export const Messages: Component<IMessagesProps> = props => {
  let uListRef: HTMLUListElement | undefined

  createEffect(on(
    () => props.messages,
    () => { scrollToBottom(uListRef, 'auto') }
  ))

  onMount(() => { scrollToBottom(uListRef) })

  return (
    <div class={ cn('overflow-auto', props.class) }>
      <ul ref={ uListRef } class={ cn('flex flex-col p-2 gap-2') }>
        <For each={ props.messages }>
          {
            message => (
              <li>
                <Message message={ message } />
              </li>
            )
          }
        </For>
      </ul>
    </div>
  )
}
