import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import "tailwindcss/tailwind.css";

const theme = extendTheme({
  styles: {
    colors: {
      brand: {
        100: "#1C3F73",
        200: "#E0EAF1",
        300: "#1389E6",
        400: "#F5FAFE",
        500: "#BCD2E2",
        600: "#4E6072",
      },
    },
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
