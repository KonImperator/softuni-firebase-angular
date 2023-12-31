/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: {
          dark: '#ff5722',
          light: '#f57797'
        }
      },
      textColor: {
        'primary-dark': '#ff5722',
        'primary-light': '#f57797'
      },
    },
  },
  plugins: [require("rippleui")],
  /** @type {import('rippleui').Config} */
  rippleui: {
    themes: [
      {
      	themeName: "light",
      	colorScheme: "light",
      	colors: {
      		primary: "#f57797",
      		backgroundPrimary: "#1a1a1a",
      	},
      },
      {
        themeName: "dark",
        colorScheme: "dark",
        colors: {
          primary: "#ff5722",
          backgroundPrimary: "#1a1a1a",
        },
      },
    ],
    defaultStyle: false,
  },
};
