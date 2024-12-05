// tailwind.config.js
module.exports = {
  mode: "jit", // Enable JIT mode

  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all your source files
    "./public/index.html", // Include the HTML file if needed
  ],
  theme: {
    container: {
      center: true, // Centers the container by default
      padding: "15rem", // Adds default padding
    },
    extend: {
      screens: {
        sm: { max: "640px" },
        md: { max: "768px" },
        lg: { max: "1024px" },
        xl: { max: "1280px" },
      },
    },
  },
  plugins: [],
};
