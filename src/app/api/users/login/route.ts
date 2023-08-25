import {connect} from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User from "@/app/modles/userModel";


connect();

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json();
        const {email,password}=reqBody;
        console.log(reqBody);

        //check if user exist
        const user = await User.findOne({email});
        if(!user){
              return NextResponse.json({error:"user does not exist,Please Sign in"},{status:400})
        }

        //check if the password is correct
        const validatePassword=await bcryptjs.compare(password,user.password)
        if(!validatePassword){
            return NextResponse.json({error:"Incorrect Passsword!"},{status:400})
        }
        console.log("user exists");
        
        //return NextResponse.json({message:"Succesfully Login"},{status:200})
          
        //create token data
        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email,
        }
        //create token
        const token= await jwt.sign(tokenData,process.env.TOKEN!,{expiresIn:"1d"})

        const response=NextResponse.json({
            message:"Login Successfully",
            success:true,
        })
        response.cookies.set("token",token,{
            httpOnly:true,
        })
        return response;
    } catch (error:any) {
        return NextResponse.json({
            error:error.message,
            status:500,
        })
    }
} 