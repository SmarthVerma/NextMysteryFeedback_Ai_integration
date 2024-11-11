import { useSession } from 'next-auth/react'
import React from 'react'

function page() {
  const {data} = useSession()
  console.log('this is data', data)
  return (
   <div>
    hello
   </div>
  )
}

export default page
