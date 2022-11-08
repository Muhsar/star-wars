import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import { NextSeo } from 'next-seo'
import { motion } from 'framer-motion'

export default function People() {
  const fetchPeople = async (page) =>  {
   const res = await axios.get(`https://swapi.dev/api/people/?page=${page}`)
    return res.data
  }
  const [page, setPage] = React.useState(1)
  const {data, status, isPreviousData,} = useQuery(["people", page], ()=>fetchPeople(page), {
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
      className='cursor-pointer flex items-center px-4 py-2 rounded-full border-[#ffff57] border-2 hover:bg-white hover:text-[#1b1b1b] duration-500 transition-all transform hover:scale-105  disabled:opacity-40'
      onClick={() => setPage(old => Math.max(old - 1, 1))}
      disabled={page === 1}
      >
        <BsChevronLeft />
        Previous
      </button>{' '}
        <span className='mx-6 font-extrabold lg:text-xl text-base'>Page {page}</span>
      <button
      className='cursor-pointer flex items-center px-4 py-2 rounded-full border-[#ffff57] border-2 hover:bg-white hover:text-[#1b1b1b] duration-500 transition-all transform hover:scale-105  disabled:opacity-40'
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
          Error Fetching People
        </div>
      </div>
      }
      {
        status==="loading" && <div className='h-screen w-full flex flex-col items-center justify-center'>
        <div className='text-7xl'>
          Loading People .......
        </div>
      </div>
      }
      {
        status==="success" && 
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
          {
            data?.results?.map(person=>(
              <div key={person.name} className="bg-[#1b1b1b] py-2 px-4 mx-0 my-[6px] rounded-[20px] cursor-pointer shadow-[#ffff57] shadow">
                <div className='text-[#ffff57] mx-0 my-[10px] text-lg font-bold'>{person.name}</div>
                <div className='my-[6px] mx-0 text-[#999]'>Gender - {person.gender}</div>
                <div className='my-[6px] mx-0 text-[#999]'>Birth year - {person.birth_year}</div>
              </div>
            ))
          }
      </div>
      }
    </motion.div>
  )
}
