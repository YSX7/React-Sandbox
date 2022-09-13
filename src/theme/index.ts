import {
  chakra,
  ComponentStyleConfig,
  extendTheme,
  theme,
  withDefaultColorScheme,
  type ThemeConfig,
} from "@chakra-ui/react";
import { SystemStyleFunction, mode } from "@chakra-ui/theme-tools";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

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

const Select: ComponentStyleConfig = {
  variants: {
    placeholded: (props: StyleFunctionProps) => {
      return {
        field: {
          // color: "gray.400",
          border: "1px solid",
          borderColor: "inherit",
          background: "inherit",
        },
      };
    },
  },
};

const overrides = {
  // styles: {
  //   global: (props: StyleFunctionProps) => ({
  //     "*[aria-expanded=true]": {
  //       color: "red", //mode("gray.400", "whiteAlpha.400")(props),
  //     },
  //   }),
  // },

  config: { initialColorMode: "dark", useSystemColorMode: false },
  components: {
    Button,
    Select,
  },
};

export default extendTheme(
  overrides,
  withDefaultColorScheme({ colorScheme: "teal" })
);
