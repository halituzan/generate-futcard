import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './Navigation/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: { 
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'primary': '#16a34a',
        'primary-dark': '#052e16',
        'primary-light': '#d1fae5',
        'slate': '#64748b',
        'slate-dark': '#1e293b',
        'slate-light': '#f1f5f9',
        
      },
      fontWeight: {
        "300": "300",
        "400": "400",
        "500": "500",
        "600": "600",
        "700": "700",
        "800": "800",
        "900": "900",
      },
      animation: {
        flip: 'flip 1s cubic-bezier(0, 0, 0.2, 1) infinite'
      },
      keyframes: {
        flip: {
          'from': { transform: 'rotateX(0deg)', transformOrigin: '50% bottom ', },
          'to': { transform: 'rotateX(180deg)', transformOrigin: '50% bottom ', }
        }
      }
    },
  },
  plugins: [],
}
export default config
