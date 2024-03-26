"use client"
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const page = () => {

const {data:session}=useSession()


  return (

    <div class="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-500 to-indigo-800">
       <div class="bg-white font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-xs">

         <h1 class="text-lg text-gray-700"> Name : {session?.user?.Name} </h1>
         <h3 class="text-sm text-gray-400 "> Email : {session?.user?.Email} </h3>

         <button onClick={()=>signOut()} class="bg-red-600 px-8 py-2 mt-8 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide">Log Out</button>
       </div>
     </div>
  )
}

export default page
