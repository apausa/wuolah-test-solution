import { theme, Theme } from "@chakra-ui/react";

const styles: Theme["styles"] = {
  ...theme.styles,
  global: {
    ...theme.styles.global,
    "html, body": {},
    "#__next": {
      backgroundColor: "white",
      color: "gray.900",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    },
  },
};

export default styles;
