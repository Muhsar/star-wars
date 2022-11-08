import { motion } from 'framer-motion'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import React from 'react'




export default function Home() {
  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
}
  return (
    <>
    <NextSeo title={"Star Wars"} description={"Star wars information"} openGraph={{ title:"Star Wars", description:"Star wars information" }} />
    <motion.div initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ type: 'linear' }} className='h-screen w-full flex flex-col items-center justify-center'>
      <div className='text-7xl'>
        Welcome to SWAPI
      </div>
      <div>
        A Star Wars Info Platform, More Updates Coming In Soon.....
      </div>
    </motion.div>
    </>
  )
}
