const ROUTES = {
  setup: '/setup',
  chats: '/chats',
  chat: '/chat'
} as const

const router = {
  toSetup: (): string => ROUTES.setup,
  toChats: (): string => ROUTES.chats,
  toChat: (id: string | number): string => ROUTES.chat + '/' + id
}

export default router
