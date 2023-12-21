/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        ripple: "ripple .5s linear forwards",
      },
      keyframes: {
        ripple: {
          from: {
            opacity: 0,
            transform: "scale(0)",
          },
          to: { transform: "scale(2)" },
        },
      },
      colors: {
        "surface-color": "rgb(var(--surface-color), <alpha-value>)",
        "primary-color": "rgb(var(--primary-color), <alpha-value>)",
        "secondary-color": "rgb(var(--secondary-color), <alpha-value>)",
        "danger-color": "rgb(var(--danger-color), <alpha-value>)",
        "primary-text-color": "rgb(var(--primary-text-color), <alpha-value>)",
        "secondary-text-color": "rgb(var(--secondary-text-color), <alpha-value>)",
        "border-color": "rgb(var(--border-color), <alpha-value>)",
        "message-bubble-color": "rgb(var(--message-bubble-color), <alpha-value>)",
      }
    },
  },
  plugins: [],
}
