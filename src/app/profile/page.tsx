"use client";
import axios from 'axios';
import { useRouter }  from 'next/navigation';
//import { NextResponse } from 'next/server';
import React from 'react'

export default function Profile() {
  const router=useRouter();
 async function logout(){
      try {
        await axios.get("/api/users/logout");
        router.push("/login");
      } catch (error:any) {
        console.log(error.message);
        
      }
  }
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
        <h1>Pofile</h1>
       <hr />
       <h1 >Profile Page</h1>
       <hr />
       <button className='text-white text-2xl font-bold bg-red-500 rounded-sm p-2' onClick={logout}>LOGOUT</button>
    </div>
  )
}
