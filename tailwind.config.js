module.exports = {
  theme: {
    extend: {
      keyframes: {
        "slide-left": {
          "0%": { transform: "translateX(0)", opacity: 1 },
          "100%": { transform: "translateX(100%)", opacity: 0 },
        },
        "slide-right": {
          "0%": { transform: "translateX(0)", opacity: 1 },
          "100%": { transform: "translateX(-100%)", opacity: 0 },
        },
      },
      animation: {
        "slide-left": "slide-left 0.4s forwards",
        "slide-right": "slide-right 0.4s forwards",
      },
    },
  },
};
