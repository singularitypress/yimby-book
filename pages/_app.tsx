import { AppProps } from "next/app";
import "../app/globals.scss";
import { AnimateInContainer } from "@components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <AnimateInContainer />
    </>
  );
}

export default MyApp;
