import '../styles/globals.css'
import React from 'react'
import Navbar from '../components/Navbar';
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
// import { ReactQueryDevtools } from 'react-query/devtools';
const queryClient = new QueryClient();
if (typeof document === "undefined") {
  // @ts-ignore global.document = { querySelector: function () {}, };
}
function MyApp({ Component, pageProps }) {
  const [style, setStyle] = React.useState({
    bg: "bg-[#222]",
    text: "text-white",
    sub: "text-[#F1F1F1]"
  })
  const LightMode =()=> {
    setStyle({
      bg: "bg-gray-100",
      text: "text-[#232E35]",
      sub: "text-[#656D72]"
    })
  }
  const DarkMode =()=> {
    setStyle({
      bg: "bg-gray-900",
    text: "text-white",
    sub: "text-gray-100"
    })
  }

  return (
    <>
    <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
    <div className={`px-10 ${style.bg} ${style.text} min-h-screen`}>
      <Navbar />
      <Component {...pageProps} />
    </div>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </Hydrate>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
