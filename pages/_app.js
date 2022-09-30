import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../src/components/layout";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import { useSession } from "next-auth/react";
import "../styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <ChakraProvider>
          <Layout>
            {Component.auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </Layout>
        </ChakraProvider>
      </SessionProvider>
    </Provider>
  );
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}
