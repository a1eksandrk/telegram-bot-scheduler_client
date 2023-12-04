import { onMount } from "solid-js";

const rippleClick = (element: HTMLElement): void => {
  const handleMouseDown = (event: MouseEvent): void => {
    const diameter = Math.max(element.clientWidth, element.clientWidth)
    const radius = diameter / 2

    const circleEl = document.createElement('div')

    circleEl.className = 'absolute rounded-full animate-ripple bg-black opacity-10'

    circleEl.style.width = circleEl.style.height = `${diameter}px`;
    circleEl.style.left = `${event.clientX - (element.offsetLeft + radius)}px`;
    circleEl.style.top = `${event.clientY - (element.offsetTop + radius)}px`;

    circleEl.addEventListener('animationend',  circleEl.remove)

    element.appendChild(circleEl)
  }

  onMount(() => {
    element.addEventListener('mousedown', handleMouseDown)
  })
}

export default rippleClick

declare module "solid-js" {
  namespace JSX {
    interface DirectiveFunctions {
      rippleClick: typeof rippleClick;
    }
  }
}
