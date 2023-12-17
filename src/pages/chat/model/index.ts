import { createCachedResource } from 'solid-cached-resource'

import { fetchChat } from '@/shared/api'

import type { Resource } from 'solid-js'
import type { IChat } from '@/shared/types'
import type { RouteDataFuncArgs } from '@solidjs/router'

export const chatData = ({ params }: RouteDataFuncArgs): Resource<IChat> => {
  const id = (): string => params.id

  const [chat] = createCachedResource<IChat, typeof fetchChat>(
    () => ['chatData', id()],
    async ([, id]: [string, string]) => await fetchChat(id)
  )

  return chat
}
