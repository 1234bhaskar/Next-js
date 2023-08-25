import mongoose from "mongoose";
export async function connect(){
    try{
          mongoose.connect(process.env.MONGODB_URI!).then(()=>{
            console.log('database connected succesfully');
          }).catch((e)=>{
                 console.log('Somthing went wrong in database');
        console.log(e);   
          })
    }catch(e){
        console.log('Somthing went wrong');
        
        console.log(e);   
    }
}