import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <div className='border-b-2 border-[#ffff57] w-full flex items-center pt-5 justify-between'>
      <Link href="/" className="text-2xl font-bold">SWAPI</Link>
      <div className="flex items-center text-lg">
        <Link href="/people" className="">People</Link>
        <Link href="/planets" className=" mx-4">Planets</Link>
        <div className="">
          
        </div>
      </div>
    </div>
  )
}
