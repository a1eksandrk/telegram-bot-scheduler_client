import mockChatsJSON from '@/shared/assets/chats.json'

import type { IChatView } from '@/shared/types'

export const fetchChats = async (): Promise<IChatView[]> => {
  return await new Promise(resolve => setTimeout(() => { resolve(mockChatsJSON) }, 100))
}

export const fetchChat = async (chatListItemId: string): Promise<IChatView> => {
  const chatListItem = mockChatsJSON.find(({ id }) => id === chatListItemId)

  return await new Promise((resolve, reject) => setTimeout(() => {
    if (chatListItem) resolve(chatListItem)

    reject(Error('{ code: 404 }'))
  }, 100))
}
