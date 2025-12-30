/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dart: {
          red: '#e63946',
          green: '#2a9d8f',
          black: '#1a1a1a',
          cream: '#f5e6c8',
        }
      }
    },
  },
  plugins: [],
  safelist: [
    { pattern: /bg-(purple|blue|emerald|orange|rose|amber|cyan|lime|fuchsia|slate)-(400|500|600|900)/ },
    { pattern: /from-(purple|blue|emerald|orange|rose|amber|cyan|lime|fuchsia|slate)-(400|500|600)/ },
    { pattern: /to-(purple|blue|emerald|orange|rose|amber|cyan|lime|fuchsia|slate)-(400|500|600)/ },
    { pattern: /via-(purple|blue|emerald|orange|rose|amber|cyan|lime|fuchsia|slate)-(500|600)/ },
    { pattern: /text-(purple|blue|emerald|orange|rose|amber|cyan|lime|fuchsia|slate)-(400|500)/ },
    { pattern: /border-(purple|blue|emerald|orange|rose|amber|cyan|lime|fuchsia|slate)-(500)/ },
  ]
}
