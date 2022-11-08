import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import { NextSeo } from 'next-seo'
import { motion } from 'framer-motion'

export default function Planets() {
  const fetchPlanets = async (page) =>  {
   const res = await axios.get(`https://swapi.dev/api/planets/?page=${page}`)
   console.log(res)
   console.log(res.data)
    return res.data
  }
  const [page, setPage] = React.useState(1)
  const {data, status, isPreviousData,} = useQuery(["planets", page], ()=>fetchPlanets(page), {
    keepPreviousData : true
  })
  console.log(data)
  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
}
  return (
    <motion.div initial="hidden"
    animate="enter"
    exit="exit"
    variants={variants}
    transition={{ type: 'linear' }}>
    <NextSeo title={"SWAPI"} description={"Star wars information"} openGraph={{ title:"SWAPI", description:"Star wars information" }} />
    <motion.div  className="w-full flex justify-center items-center my-4">
      <button
      className='cursor-pointer flex items-center px-4 py-2 rounded-full border-[#ffff57] border-2 hover:bg-white hover:text-[#1b1b1b] duration-500 transition-all transform hover:scale-105 disabled:opacity-40'
      onClick={() => setPage(old => Math.max(old - 1, 1))}
      disabled={page === 1}
      >
        <BsChevronLeft />
        Previous
      </button>{' '}
      <span className='mx-6 font-extrabold lg:text-xl text-base'>Page {page}</span>
      <button
      className='cursor-pointer flex items-center px-4 py-2 rounded-full border-[#ffff57] border-2 hover:bg-white hover:text-[#1b1b1b] duration-500 transition-all transform hover:scale-105 disabled:opacity-40'
      onClick={() => {
        if (!isPreviousData && data.next) {
          setPage(old => old + 1)
        }
      }}
      disabled={isPreviousData || !data?.next}
      >
        Next
        <BsChevronRight />
      </button>
        </motion.div>
      {
        status==="error" && <div className='h-screen w-full flex flex-col items-center justify-center'>
        <div className='text-7xl'>
          Error Fetching Planets
        </div>
      </div>
      }
      {
        status==="loading" && <div className='h-screen w-full flex flex-col items-center justify-center'>
        <div className='text-7xl'>
          Loading Planets .......
        </div>
      </div>
      }
      {
        status==="success" && 
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
          {
            data?.results?.map(planet=>(
              <div key={planet.name} className="bg-[#1b1b1b] py-2 px-4 mx-0 my-[6px] rounded-[20px] cursor-pointer shadow shadow-[#ffff57] transform transition-all duration-500 hover:scale-105">
                <div className='text-[#ffff57] mx-0 my-[10px] text-lg font-bold'>{planet.name}</div>
                <div className='my-[6px] mx-0 text-[#999]'>Population - {planet.population}</div>
                <div className='my-[6px] mx-0 text-[#999]'>Terrain - {planet.terrain}</div>
              </div>
            ))
          }
      </div>
      }
    </motion.div>
  )
}
