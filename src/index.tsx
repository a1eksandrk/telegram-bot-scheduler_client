/* @refresh reload */
import { render } from 'solid-js/web'

import App from '@/app'

const root = document.getElementById('root')

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
render(() => <App />, root!)
