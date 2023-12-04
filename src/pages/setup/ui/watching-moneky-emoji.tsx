import { Show } from 'solid-js'

import type { Component } from 'solid-js'

interface IWatchingMonkeyEmoji {
  watch?: boolean
}

const WatchingMonkeyEmoji: Component<IWatchingMonkeyEmoji> = props => {
  return (
    <span class="text-9xl leading-9xl select-none">
      <Show when={ props.watch } fallback={ '🙈' }>
        🙉
      </Show>
    </span>
  )
}

export default WatchingMonkeyEmoji
