import {
  chakra,
  ComponentStyleConfig,
  extendTheme,
  withDefaultColorScheme,
  type ThemeConfig,
} from "@chakra-ui/react";
import { IconButton } from "@/components/UI/calendar/theme";

const Button: ComponentStyleConfig = {
  baseStyle: {
    color: "teal",
    bg: "transparent",
  },
};

const overrides = {
  config: { initialColorMode: "dark", useSystemColorMode: false },
  components: {
    Button,
  },
};

export default extendTheme(
  overrides,
  withDefaultColorScheme({ colorScheme: "teal" })
);
