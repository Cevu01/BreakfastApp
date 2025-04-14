/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        bdogroteskRegular: ["BDOGroteskRegular", "sans-serif"],
        bdogroteskDemiBold: ["BDOGroteskDemiBold", "sans-serif"],
        fredokaLight: ["FredokaLight", "sans-serif"],
        fredokaRegular: ["FredokaRegular", "sans-serif"],
        fredokaMedium: ["FredokaMedium", "sans-serif"],
        fredokaBold: ["FredokaBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
