// app/profile/[username]/page.tsx
'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Define the type for params
interface Params {
  username: string;
}

function Page({ params }: { params: Params }) {
  const router = useRouter();

  const [paramUsername, setParamUsername] = useState<string| null>(params.username)
  const [validUsername, setValidUsername] = useState(true)


  
  return (
    <div>
      Hello, {params.username}!
    </div>
  );
}

export default Page;