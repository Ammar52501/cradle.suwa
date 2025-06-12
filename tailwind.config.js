import plugin from "tailwindcss/plugin";
import tailwindcssAnimate from "tailwindcss-animate";

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    borderRadius: {
      "3xl": "calc(var(--radius) + 2rem)",
      "2xl": "calc(var(--radius) + 1rem)",
      "1xl": "calc(var(--radius) + 0.5rem)",
      xl: "calc(var(--radius) + 0.25rem)",
      lg: "var(--radius)",
      md: "calc(var(--radius) - 0.125rem)",
      DEFAULT: "calc(var(--radius) - 0.25rem)",
      sm: "calc(var(--radius) - 0.375rem)",
      xs: "calc(var(--radius) - 0.5rem)",
      full: "9999px",
      none: "0",
    },
    container: undefined,
    extend: {
      margin: {
        "header-height": "var(--header-height)",
      },
      opacity: {
        hover: "0.8",
      },
      fontFamily: {
        main: ["var(--effra-font)"],
      },
      height: {
        "header-height": "var(--header-height)",
      },
      fontSize: {
        title: "var(--title-font-size)",
        subtitle: "var(--subtitle-font-size)",
        CTA: "var(--CTA-font-size)",
        p: "var(--p-font-size)",
        small: "var(--small-font-size)",
        xs: "var(--xs-small-font-size)",
      },
      colors: {
        background: "hsl(var(--background))",
        "background-secondary": "hsl(var(--background-secondary))",
        foreground: "hsl(var(--foreground))",
        "main": "var(--main_color)",
        "hover": "hsl(var(--hover))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      screens: {
        "phone": "450px",
        xs: "550px",
        tab: "900px",
      },
      keyframes: {
        bouncing: {
          "0%, 100%": {
            transform: "translateY(-3px)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(3px)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      animation: {
        bouncing: "bouncing 0.8s infinite",
      },
    },
  },
  corePlugins: {
    container: false,
    space: false,
  },
  safelist : [
    "line-clamp-3",
    "line-clamp-2",
    "line-clamp-1",
  ],
  plugins: [
    tailwindcssAnimate,
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "space-x": (value) => ({
            "& > :not([hidden]) ~ :not([hidden]):not([data-ignore])": {
              "margin-inline-start": value,
            },
          }),
        },
        { values: theme("spacing") }
      );
      matchUtilities(
        {
          "space-x-e": (value) => ({
            "& > * + *": {
              "margin-inline-end": value,
            },
          }),
        },
        { values: theme("spacing") }
      );
      matchUtilities(
        {
          "space-y": (value) => ({
            "& > :not([hidden]) ~ :not([hidden]):not([data-ignore])": {
              "margin-top": value,
            },
          }),
        },
        { values: theme("spacing") }
      );
    }),
  ],
};
export default config;
