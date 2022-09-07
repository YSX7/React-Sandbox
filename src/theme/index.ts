import {
  chakra,
  ComponentStyleConfig,
  extendTheme,
  theme,
  withDefaultColorScheme,
  type ThemeConfig,
} from "@chakra-ui/react";
import { SystemStyleFunction } from "@chakra-ui/theme-tools";

export const IconButton: ComponentStyleConfig = {
  variants: {
    fullheight: {
      height: "100%",
    },
  },
};

const baseButtonStyle: SystemStyleFunction = ({ colorMode }) => ({
  bg: "transparent",
  color: colorMode === "dark" ? "white" : "teal",
});

const Button: ComponentStyleConfig = {
  baseStyle: baseButtonStyle,
  variants: {
    base: {
      _hover: {
        bg: "teal",
        color: "white",
      },
    },
    link: {},
  },
  defaultProps: {
    variant: "base",
  },
};

const overrides = {
  // styles: {
  //   global: {
  //     button: {
  //       bg: "red",
  //     },
  //   },
  // },
  colors: {},
  config: { initialColorMode: "dark", useSystemColorMode: false },
  components: {
    Button,
  },
};

export default extendTheme(
  overrides,
  withDefaultColorScheme({ colorScheme: "teal" })
);
