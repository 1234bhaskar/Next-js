"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios  from 'axios';
import toast  from 'react-hot-toast';


function LoginPage() {
  const router=useRouter();
    const [user,setUser]=useState({
        email:"",
        password:"",
        
    })
    const [buttonDisabled,setButtonDisabled]=useState(false);
    const [loading,setLoading]=useState(false);
    const OnLogin = async ()=>{

      try{
        setLoading(true);
       const response = await axios.post("/api/users/login",user);
         console.log("Login success",response.data);
         toast.success("Login Success");
         router.push("/profile")
       
      }catch(error:any){
             console.log("SignUp failed",error.message);
             toast.error(error.message);
             
      }finally{
                setLoading(false); 

      }
         
    }
    useEffect(()=>{
      if(user.email.length>0 && user.password.length>0){
         setButtonDisabled(true);
        }else{
        setButtonDisabled(false);
        
      }
    },[user])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
    <h1>{loading?"Processing":"Login"}</h1>
    <hr />
    <label htmlFor="email">
        email
    </label>
    <input type="email"  className='rounded-md p-2 text-black  bg-gray-400 focus:outline-none' value={user.email} onChange={(e)=>{setUser({...user,email:e.target.value})    }}/>
    <label htmlFor="password">
        Password
    </label>
    <input type="password" className='rounded-md p-2 text-black bg-gray-400' value={user.password} onChange={(e)=>{setUser({...user,password:e.target.value})    }}/>
  
      <button className='text-black bg-slate-100 p-2 m-2 rounded-md' onClick={OnLogin}>{buttonDisabled?"Login":"No-Login"}</button>
      <Link href="/signup">Visit SignUp Page</Link>
    </div>
  )
}

export default LoginPage