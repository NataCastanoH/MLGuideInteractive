/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Puedes agregar colores personalizados aquí
      },
      fontFamily: {
        // Puedes agregar fuentes personalizadas aquí
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)' },
          '100%': { transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
  safelist: [
    // Colores dinámicos que se usan en el componente
    {
      pattern: /bg-(emerald|amber|blue|purple|orange|pink|cyan|indigo|red|green|yellow)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /text-(emerald|amber|blue|purple|orange|pink|cyan|indigo|red|green|yellow)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /border-(emerald|amber|blue|purple|orange|pink|cyan|indigo|red|green|yellow)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /from-(emerald|amber|blue|purple|orange|pink|cyan|indigo|red|green|yellow)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /to-(emerald|amber|blue|purple|orange|pink|cyan|indigo|red|green|yellow)-(50|100|200|300|400|500|600|700|800|900)/,
    }
  ]
}
