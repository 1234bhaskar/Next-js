import React from 'react'

export default function UserProfile({params}:any) {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
        <h1>User Pofile</h1>
       <hr />
       <h1 className='text-4xl bg-yellow-600 text-black' >{"Profile Page" + params.id }</h1>
    </div>
  )
}
