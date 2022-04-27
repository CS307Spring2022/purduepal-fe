export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: "#222222",
          },
          secondary: {
            main: "#989ba4",
          },
          background: {
            default: "#d4d9e1",
          },
          text: {
            primary: "#333333",
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
