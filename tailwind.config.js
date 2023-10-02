const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme:{
        extend: {
            fontFamily: {
                ibm: ['IBM Plex Sans', 'ui-sans-serif', 'system-ui'],
                ibmCondensed: ['IBM Plex Sans Condensed', 'ui-sans-serif', 'system-ui']
            },
        }
    },
    plugins: [require("@tailwindcss/typography")],
};
