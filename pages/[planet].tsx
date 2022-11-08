import { useRouter } from 'next/router'
import React from 'react'

export default function Planet() {
    const router = useRouter()
    const { planet: any } = router.query
  return (
    <div>Planet</div>
  )
}
