import { createResource } from 'solid-js'

import { fetchChat } from '@/shared/api'

import type { ResourceReturn } from 'solid-js'
import type { IChat } from '@/shared/types'
import type { RouteDataFuncArgs } from '@solidjs/router'

export const chatData = ({ params }: RouteDataFuncArgs): ResourceReturn<IChat> => {
  const id = (): string => params.id

  return createResource(
    id,
    fetchChat
  )
}
