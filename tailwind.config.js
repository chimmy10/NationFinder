/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}"],
	theme: {
		extend: {
			animation: {
				"fade-in": "fadeIn 0.6s ease-out",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: 0, transform: "scale(0.95)" },
					"100%": { opacity: 1, transform: "scale(1)" },
				},
			},
		},
	},
	plugins: [],
};
