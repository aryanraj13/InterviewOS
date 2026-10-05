/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        bg: "#080B0A",
        "bg-secondary": "#0E1310",
        card: "#121713",
        navbar: "rgba(8,11,10,.85)",

        primary: "#34D399",
        secondary: "#22C58D",
        accent: "#10B981",

        heading: "#F5F7F6",
        text: "#A6B0AC",
        muted: "#6B756F",

        border: "#1E2622",
        glow: "rgba(52,211,153,.16)",
        hoverGreen: "#5EEAB0",
      },

      fontFamily: {
        display: [
          "'Clash Display'",
          "'Space Grotesk'",
          "sans-serif",
        ],
        sans: [
          "'Inter'",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "'JetBrains Mono'",
          "'Fira Code'",
          "monospace",
        ],
      },

      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(52,211,153,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.05) 1px, transparent 1px)",

        "radial-glow":
          "radial-gradient(circle at center, rgba(52,211,153,0.12), transparent 70%)",
      },

      boxShadow: {
        glow: "0 0 40px rgba(52,211,153,.16)",
        "glow-sm": "0 0 20px rgba(52,211,153,.12)",
        card: "0 8px 30px rgba(0,0,0,.4)",
      },

      animation: {
        blob: "blob 18s infinite ease-in-out",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
        marquee: "marquee 30s linear infinite",
        blink: "blink 1s step-end infinite",
        "gradient-x": "gradient-x 6s ease infinite",
      },

      keyframes: {
        blob: {
          "0%, 100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -40px) scale(1.08)",
          },
          "66%": {
            transform: "translate(-25px, 25px) scale(0.94)",
          },
        },

        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-14px)",
          },
        },

        marquee: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-50%)",
          },
        },

        blink: {
          "0%, 100%": {
            opacity: 1,
          },
          "50%": {
            opacity: 0,
          },
        },

        "gradient-x": {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
        },
      },
    },
  },

  plugins: [],
};