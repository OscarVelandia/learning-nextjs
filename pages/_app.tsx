import { AppProps } from "next/app";

import "../styles/global.scss";
import "../styles/utils.scss";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
