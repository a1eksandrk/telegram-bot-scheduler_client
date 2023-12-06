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
        "surface-color": "var(--surface-color)",
        "primary-color": "var(--primary-color)",
        "danger-color": "var(--danger-color)",
        "primary-text-color": "var(--primary-text-color)",
        "secondary-text-color": "var(--secondary-text-color)",
        "border-color": "var(--border-color)",
      }
    },
  },
  plugins: [],
}
