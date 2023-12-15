import type { IChatItem } from '@/shared/types'

const generateMockChatData = (): IChatItem[] => {
  const chatData: IChatItem[] = []

  for (let i = 0; i < 100; i++) {
    chatData.push({
      id: crypto.randomUUID(),
      name: `User${i + 1}`,
      time: `${Math.floor(Math.random() * 24)
        .toString()
        .padStart(2, '0')}:${Math.floor(Math.random() * 60)
        .toString()
        .padStart(2, '0')}`,
      message: `Random message ${i + 1}`,
      count: Math.floor(Math.random() * 10),
      image: 'https://placehold.co/600x400'
    })
  }

  return chatData
}

export const mockChatsList = generateMockChatData()
