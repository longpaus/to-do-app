/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#c38fff",
        onPrimary: "#000000",
        // dark mode
        darkBackground: "#121212",
        darkSurface: "#1e1e1e",
        darkOnSurface: "white",

        // light mode
        lightBackground: "#fafafa",
        lightSurface: "#f6f8ff",
        lightOnSurface: "black",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["hover", "focus", "dark"], // Extend for dark mode
      textColor: ["hover", "focus", "dark"], // Extend for dark mode
    },
  },
  plugins: [],
};
