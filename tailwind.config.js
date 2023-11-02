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
            colors: {
                'ff-red': '#c83426',
                'ff-yellow': '#957f12',
                'ff-blue': '#126988',
                'ff-green': '#01723a',
                'ff-purple': '#68437c',
                'ff-navy': '#061e2a'
            }
        }
    },
    plugins: [require("@tailwindcss/typography")],
};
