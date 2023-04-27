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
      screens: {
        xs: "365px",
      },
      colors: {
        primary: "#3B71FE",
        secondary: "#84878B",
        hover: "#1E5AF4",
        disabled: "#E5E5E5",
        input: "#E7ECF3",
        primaryBorder: "#DEDFE1",
        primaryGray: "#F4F5F6",
        secondaryGray: "#777E90",
        tertiaryGray: "#F4F2F1",
        primaryCyan: "#A4CDE3",
        primaryYellow: "#FFAF4E",
      },
      fontFamily: {
        primary: ["Epilogue", "DM Sans", "Roboto", "sans-serif"],
        secondary: ["Poppins", "DM Sans", "Roboto", "sans-serif"],
        tertiary: ["Be Vietnam", "Poppins", "DM Sans", "sans-serif"],
      },
      gridTemplateColumns: {
        14: "repeat(14, minmax(0, 1fr));",
      },
      backgroundImage: {
        homepageBackground: "url('src/assets/images/TrainStation2.png')",
        logoBackground: "url('src/assets/images/BigWhiteLogo2.png')",
        randomBackground:
          "url('https://images.unsplash.com/photo-1543746379-597ec1921f02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80')",
        sendoTrainBackground: "url('src/assets/images/SendoTrainIcon.png')",
        dashLineBackground: "url('src/assets/images/DashLineIcon.png')",
      },
      backgroundPosition: {
        "bottom-center-4": "60% 65%",
        "left-center": "0% 150px",
      },
      boxShadow: {
        shadow1: "rgba(0, 0, 0, 0.34) 0px 4px 9px;",
        shadow2:
          "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;",
        shadow3: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
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
        ".small-container": {
          maxWidth: theme("columns.5xl"),
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
