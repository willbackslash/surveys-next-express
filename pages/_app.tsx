import '../styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css"
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { Session } from 'next-auth'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session; }>) {
  return (
    <>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
