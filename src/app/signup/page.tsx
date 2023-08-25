"use client";
import React, { useState,useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios  from 'axios';
import { NextResponse } from 'next/server';
import { toast } from 'react-hot-toast';

function signup() {
  const router=useRouter();
    const [user,setUser]=useState({
        email:"",
        password:"",
        username:"",
    })

    const [buttonDisabled,setButtonDisabled]=useState(false);
    const[loading,setLoading]=useState(false);
    const OnsignUP = async ()=>{
      try{
         setLoading(true);
         const response= await axios.post("/api/users/signup",user);
         console.log("Successfull signin",response.data);
         router.push("/login");
         
      }
      catch(error:any){
           console.log("Sign up failed",error.message);
           toast.error(error.message);
           
      }finally{
        setLoading(true);
      }
         
    }

    useEffect(() => {
     if(user.email.length>0 &&user.password.length>0 &&user.username.length>0 ){
      setButtonDisabled(false);
     }else{
      setButtonDisabled(true);
     }
    }, [user])
    
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
    <h1>{loading?"Processing":"Sign-UP"}</h1>
    <hr />
    <label htmlFor="username">
        username
    </label>
    <input type="text" className='rounded-md p-2 text-black  outline-none ' value={user.username} onChange={(e)=>{setUser({...user,username:e.target.value})}} placeholder='username'/>
    <label htmlFor="email">
        email
    </label>
    <input type="email"  className='rounded-md p-2 text-black   outline-none' placeholder='email' value={user.email} onChange={(e)=>{setUser({...user,email:e.target.value})    }}/>
    <label htmlFor="password">
        Password
    </label>
    <input type="password" className='rounded-md p-2 text-black  outline-none' placeholder='password' value={user.password} onChange={(e)=>{setUser({...user,password:e.target.value})    }}/>
  
      <button className='text-black bg-slate-100 p-2 m-2 rounded-md' onClick={OnsignUP}>{buttonDisabled?"No-SIGNUP":"SIGNUP"}</button>
      <Link href="/login">Visit Login Page</Link>
    </div>
  )
}

export default signup