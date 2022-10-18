import { extendTheme, theme } from "@chakra-ui/react";

import styles from "./styles";

const overrides = {
  ...theme,
  styles,
};

export default extendTheme(overrides);
