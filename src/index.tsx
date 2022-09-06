import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store";
import { createRoot } from "react-dom/client";
import dayjs from "dayjs";
import ObjectSupport from "dayjs/plugin/objectSupport";
import Weekday from "dayjs/plugin/weekday";
import LocaleData from "dayjs/plugin/localeData";
import WeekOfYear from "dayjs/plugin/weekOfYear";
import Duration from "dayjs/plugin/duration";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";

const container = document.getElementById("root");
const root = createRoot(container as Element);

dayjs.locale("ru");
dayjs.extend(ObjectSupport);
dayjs.extend(Weekday);
dayjs.extend(LocaleData);
dayjs.extend(WeekOfYear);
dayjs.extend(Duration);

root.render(
  <Provider store={store}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </Provider>
);
