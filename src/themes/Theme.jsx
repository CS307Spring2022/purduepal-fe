export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: "#DAAA00",
          },
          secondary: {
            main: "#6F727B",
          },
          background: {
            default: "#CFB991",
          },
          text: {
            primary: "#6F727B",
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#DAAA00",
          },
          secondary: {
            main: "#6F727B",
          },
          background: {
            default: "#000000",
          },
          text: {
            primary: "#ffffff",
          },
        }),
  },
});
