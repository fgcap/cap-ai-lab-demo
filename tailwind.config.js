/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#000B1A', // Deep Midnight Blue
                primary: {
                    DEFAULT: '#00D2FF', // Electric Cyan
                    hover: '#00B8E6',
                },
                secondary: {
                    DEFAULT: '#0070AD', // Capgemini Blue
                },
                text: {
                    primary: '#FFFFFF', // Pure White
                    secondary: '#A0C4FF', // Soft Sky Blue
                },
                status: {
                    alert: '#FFC300', // Amber
                    error: '#FF4D4D', // Crimson
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // Assuming we might add Inter font later or use system default
            },
        },
    },
    plugins: [],
}
