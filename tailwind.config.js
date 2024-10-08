/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.tsx"],
	theme: {
		extend: {
			backgroundImage: {
				divider: "url(/src/assets/divider.png)",
			},
			fontFamily: {
				f1: ["Titillium Web", "sans-serif"],
				f1Title: ["Formula1-Regular", "sans-serif"],
			},
			colors: {
				"f1-red": "#eb1c24",
				"f1-black": "#000000",
				"f1-silver": "#38383f",
				"f1-bg-silver": "#ededed",
				"f1-lightSilver": "#dcdada",
				"f1-carbon": "#15151e",
				"f1-text": "#15151e",
				"f1-purple": "#581c87",
				rolex: "#006341",
				whatsapp: "#4dc247",
			},
		},
	},
	plugins: [],
};
