import mockChatsJSON from '@/shared/assets/chats.json'

import type { IChat, IMessage, TMessageData } from '@/shared/types'

let mockChats = structuredClone<IChat[]>(mockChatsJSON)

export const fetchChats = async (): Promise<IChat[]> => {
  return await new Promise(resolve => setTimeout(() => { resolve(mockChats) }, 100))
}

export const fetchChat = async (chatItemId: string): Promise<IChat> => {
  const chatItem = mockChats.find(({ id }) => id === chatItemId)

  return await new Promise((resolve, reject) => setTimeout(() => {
    if (chatItem) resolve(chatItem)

    reject(new Error('{ code: 404 }'))
  }, 100))
}

interface IPostMessageParams {
  chatId: string
  messageData: TMessageData
}

export const postMessage = async ({ chatId, messageData }: IPostMessageParams): Promise<IMessage> => {
  const messageId = crypto.randomUUID()

  return await new Promise((resolve) => setTimeout(() => {
    const newMessage: IMessage = {
      id: messageId,
      ...messageData
    }

    mockChats.find(chat => chat.id === chatId)?.messages.push(newMessage)

    mockChats = structuredClone<IChat[]>(mockChats)

    resolve(newMessage)
  }, 100))
}
