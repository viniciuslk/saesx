import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          60: "#C7EDF7",
          40: "#ABE5F4",
          20: "#8FDCF0",
          base: "#73D3EC",
          DEFAULT: "#73D3EC",
        },
        secondary: {
          60: "#ACACC0",
          40: "#8283A0",
          20: "#595981",
          base: "#2F3061",
          DEFAULT: "#2F3061",
        },
        feedback: {
          info: "#14BCFF",
          success: "#18BE65",
          warning: "#F6AA19",
          error: "#E45A58",
        },
        background: {
          primary: "#FFFFFF",
          secondary: "#F7F7F7",
        },
      }
    },
    fontSize: {
      xxxsmall: ["0.543rem", { lineHeight: "0.625rem" }],
      xxsmall: ["0.625rem", { lineHeight: "0.75rem" }],
      xsmall: ["0.75rem", { lineHeight: "1rem" }],
      small: ["0.875rem", { lineHeight: "1.25rem" }],
      medium: ["1rem", { lineHeight: "1.25rem" }],
      large: ["1.125rem", { lineHeight: "1.5rem" }],
      xlarge: ["1.5rem", { lineHeight: "2rem" }],
      xxlarge: ["2rem", { lineHeight: "2.5rem" }],
      xxxlarge: ["3rem", { lineHeight: "1rem" }],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem'
      }
    },
  },
  plugins: [
    require('preline/plugin')
  ],
}
export default config
