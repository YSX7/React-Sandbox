import { extendTheme } from "@chakra-ui/react";
import { IconButton } from "@/components/UI/calendar/theme";

const overrides = {
  components: {
    IconButton,
  },
};

export default extendTheme(overrides);
