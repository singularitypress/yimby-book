import { AppProps } from "next/app";
import "../app/globals.scss";
import { Inter } from "next/font/google";
import { AnimateInContainer } from "@components";

const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div
        className={`${inter.className} w-full flex flex-col justify-center items-center`}
      >
        <Component {...pageProps} />
      </div>
      <AnimateInContainer />
    </>
  );
}

export default MyApp;
