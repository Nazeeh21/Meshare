import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import "react-tagsinput/react-tagsinput.css";
import "tailwindcss/tailwind.css";
import { wrapper } from "../redux/store";
import AppLayout from "../Components/AppLayout";
import TimeAgo from "javascript-time-ago";
import '../styles/global.css'

import en from "javascript-time-ago/locale/en";

TimeAgo.addLocale(en);

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
      <AppLayout {...pageProps}>
        <Component {...pageProps} />
      </AppLayout>
    </ChakraProvider>
  );
}

export default wrapper.withRedux(App);
