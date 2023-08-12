import "styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

import { AuthProvider } from "providers/auth/AuthProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SWRConfig>
        <Component {...pageProps} />;
      </SWRConfig>
    </AuthProvider>
  );
}
