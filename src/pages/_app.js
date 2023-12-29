import "src/styles/globals.css";
import "src/styles/stytch.css";

import { StytchProvider } from "@stytch/nextjs";
import { createStytchUIClient } from "@stytch/nextjs/ui";
import Head from "next/head";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "src/components/Header";

const queryClient = new QueryClient();

const stytch = createStytchUIClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN
);

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Shared TodoList App</title>
        <meta
          name="description"
          content="A shared todo list app built with Stytch"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <StytchProvider stytch={stytch}>
        <Header />
        <main>
          <div className="container">
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
            </QueryClientProvider>
          </div>
        </main>
      </StytchProvider>
    </>
  );
}
