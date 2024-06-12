/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.js", "./src/**/*.js"],
  theme: {
		fontFamily: {
			sans: ["'Open Sans'", '-apple-system', 'BlinkMacSystemFont', "'Segoe UI'", 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', "'Fira Sans'", "'Droid Sans'", "'Helvetica Neue'", 'sans-serif'],
			serif: ['Merriweather', 'serif'],
		},
    extend: {},
  },
  plugins: [],
}

