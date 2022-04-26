export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: "#555960",
          },
          secondary: {
            main: "#6F727B",
          },
          background: {
            default: "#EDEDED",
          },
          text: {
            primary: "#555960",
            secondary: "#000000"
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
