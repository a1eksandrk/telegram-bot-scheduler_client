import { onMount } from 'solid-js'

import { className as cn } from '@/shared/lib'

const rippleClick = (element: HTMLElement): void => {
  const handleMouseDown = (event: MouseEvent): void => {
    const diameter = Math.max(element.clientWidth, element.clientWidth)
    const radius = diameter / 2

    const overlay = document.createElement('div')
    const circleEl = document.createElement('div')

    overlay.className = cn(
      element.className,
      'absolute top-0 right-0 bottom-0 left-0 overflow-hidden bg-transparent hover:bg-transparent'
    )

    circleEl.className = cn('absolute rounded-full animate-ripple bg-black opacity-10')

    circleEl.style.width = circleEl.style.height = `${diameter}px`
    circleEl.style.left = `${event.clientX - (element.offsetLeft + radius)}px`
    circleEl.style.top = `${event.clientY - (element.offsetTop + radius)}px`

    const handleAnimationEnd = (): void => {
      overlay.remove()
    }

    circleEl.addEventListener('animationend', handleAnimationEnd)

    element.appendChild(overlay)
    overlay.appendChild(circleEl)
  }

  onMount(() => {
    element.addEventListener('mousedown', handleMouseDown)
  })
}

export default rippleClick

declare module 'solid-js' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface DirectiveFunctions {
      rippleClick: typeof rippleClick
    }
  }
}
