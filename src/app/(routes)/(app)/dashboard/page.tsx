import { useSession } from 'next-auth/react'
import React from 'react'

function Page() {
  const { data, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div> // or any other loading state
  }

  if (status === 'unauthenticated') {
    return <div>Please log in</div> // or any other unauthenticated state
  }

  console.log('this is data', data)

  return (
    <div>
      Hello
    </div>
  )
}

export default Page