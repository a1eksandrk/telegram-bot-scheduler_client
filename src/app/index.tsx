import { Router, Navigate, useRoutes } from '@solidjs/router'

import { SetupPage } from '@/pages/setup'
import { ChatsPage, chatsData } from '@/pages/chats'
import { ChatPage, chatData } from '@/pages/chat'
import { router } from '@/shared/models'

import type { Component } from 'solid-js'
import type { RouteDefinition } from '@solidjs/router'

import './index.css'

const routes: RouteDefinition[] = [
  {
    path: '/setup',
    component: SetupPage
  },
  {
    path: '/chats',
    data: chatsData,
    component: ChatsPage
  },
  {
    path: '/chat/:id',
    data: chatData,
    component: ChatPage
  },
  {
    path: '*',
    component: () => <Navigate href={ router.toSetup } />
  }
]

const App: Component = () => {
  const Routes = useRoutes(routes)

  return (
    <Router>
      <Routes />
    </Router>
  )
}

export default App
