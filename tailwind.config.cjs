// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {
      colors: {
        primary: "#3B71FE",
        hover: "#1E5AF4",
        disabled: "#E5E5E5",
        input: "#E7ECF3",
      },
      fontFamily: {
        primary: ["DM Sans", "Roboto", "sans-serif"],
        secondary: ["Roboto", "DM Sans", "sans-serif"],
      },
      backgroundImage: {
        homepageBackground: "url('./src/assets/images/TrainStation2.png')",
        logoBackground: "url('./src/assets/images/BigWhiteLogo.png')",
        randomBackground:
          "url('https://images.unsplash.com/photo-1543746379-597ec1921f02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80')",
      },
      backgroundPosition: {
        "bottom-center-4": "60% 65%",
        "left-center": "0% 50%",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".layout-container": {
          maxWidth: "1370px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: theme("spacing.4"),
          paddingRight: theme("spacing.4"),
        },
        ".container": {
          maxWidth: theme("columns.7xl"),
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: theme("spacing.4"),
          paddingRight: theme("spacing.4"),
          // Vì các trình duyệt phiên bản cũ (Chrome <2020, IE 9 11, ...v.v) chưa hỗ trợ kiểu styles này nên phải tạm comment để sử dụng kiểu trên
          // marginInline: "auto",
          // paddingInline: theme("spacing.4"),
          // Nguồn: https://caniuse.com/?search=%20%20padding-inline và https://caniuse.com/?search=margin-inline
        },
      });
    }),
    require("@tailwindcss/line-clamp"),
  ],
};
