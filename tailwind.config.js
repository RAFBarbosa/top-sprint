/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.tsx"],
	theme: {
		extend: {
			backgroundImage: {
				blur: "url(/src/assets/blur-background.png)",
				divider: "url(/src/assets/divider.png)",
			},
			fontFamily: {
				// sans: "Roboto, sans-serif",
				f1: ["Titillium Web", "sans-serif"],
				f1Title: ["Formula1-Regular", "sans-serif"],
			},
			colors: {
				"f1-red": "#e10600",
				"f1-black": "#000000",
				"f1-silver": "#38383f",
				"f1-carbon": "#15151e",
				"f1-text": "#15151e",
				// green: {
				// 	300: "#00B37E",
				// 	500: "#00875F",
				// 	700: "#015F43",
				// },
				// blue: {
				// 	500: "#81D8F7",
				// },
				// orange: {
				// 	500: "#FBA94C",
				// },
				// red: {
				// 	500: "#F75A68",
				// },
				// gray: {
				// 	100: "#E1E1E6",
				// 	200: "#C4C4CC",
				// 	300: "#8D8D99",
				// 	500: "#323238",
				// 	600: "#29292E",
				// 	700: "#121214",
				// 	900: "#09090A",
				// },
			},
		},
	},
	plugins: [],
};
