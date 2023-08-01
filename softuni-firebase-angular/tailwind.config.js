/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("rippleui")],
  rippleui: {
		themes: [
			// {
			// 	themeName: "light",
			// 	colorScheme: "light",
			// 	colors: {
			// 		primary: "#235264",
			// 		backgroundPrimary: "#964643",
			// 	},
			// },
			{
				themeName: "dark",
				colorScheme: "dark",
				colors: {
					primary: "#ff5722",
					backgroundPrimary: "#1a1a1a",
				},
			},
		],
    defaultStyle: false
	},
}

