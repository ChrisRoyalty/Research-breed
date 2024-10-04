module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      animation: {
        "bounce-in": "bounceIn 0.75s ease-out",
        pulse: "pulse 1.5s infinite",
      },
      keyframes: {
        bounceIn: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "50%": { transform: "scale(1.05)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
