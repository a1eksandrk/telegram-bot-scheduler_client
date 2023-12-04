import { Router, Navigate, useRoutes } from '@solidjs/router'

import { SetupPage } from '@/pages/setup'
import { ChatsPage } from '@/pages/chats'

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
    component: ChatsPage
  },
  {
    path: '*',
    component: () => <Navigate href="/setup" />
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
