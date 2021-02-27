import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import DLtheme from "./public/DLtheme";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "./public/theme/";
import { Fonts } from "./public/Fonts";
import "focus-visible/dist/focus-visible";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Fonts />
      <ColorModeScript initialColorMode={DLtheme.config.initialColorMode} />

      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
