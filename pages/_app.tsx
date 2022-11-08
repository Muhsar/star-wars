import '../styles/globals.css'
import React from 'react'
import Navbar from '../components/Navbar';
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { DefaultSeo } from 'next-seo';
import { AnimatePresence } from 'framer-motion';
// import { ReactQueryDevtools } from 'react-query/devtools';
const queryClient = new QueryClient();
if (typeof document === "undefined") {
  // @ts-ignore global.document = { querySelector: function () {}, };
}
function MyApp({ Component, pageProps, router }) {
  const [style, setStyle] = React.useState({
    bg: "bg-[#222]",
    text: "text-white",
    sub: "text-[#F1F1F1]"
  })
  const url = `https://star-wars-lemon.vercel.app/${router.route}`

  return (
    <>
    <DefaultSeo
                titleTemplate="%s - SWAPI"
                openGraph={{
                    type: 'website',
                    locale: 'en_IE',
                    url,
                    description: 'Star wars information',
                    site_name: 'SWAPI | star-wars-lemon.vercel.app',
                    images: [],
                }}
                canonical={url}
            />
    <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
    <div className={`px-10 ${style.bg} ${style.text} min-h-screen`}>
      <Navbar />
      <AnimatePresence
                exitBeforeEnter
                initial={false}
                onExitComplete={() => window.scrollTo(0, 0)}
            >
      <Component {...pageProps} key={url} />
            </AnimatePresence>
    </div>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </Hydrate>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
