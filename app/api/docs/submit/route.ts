import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/lib/prismadb"; 
import { use } from "react";
export async function POST(req:Request) {
    try{
        const {userId} = await auth();
        const {url,documentName,semester} = await req.json();
        console.log(userId,url);
        if(!userId){
            return new NextResponse("Unauthorized",{status:401});
        }

        const student = await db.student.findUnique({
            where : {
                userId:userId
            }
        });
        if(!student){
            return new NextResponse("Unauthorized",{status:401});
        }
        console.log(student.id,url);
        const document = await db.document.create({
          data: {
              studentId: student.id,
              filePath: url, // Assuming files is an array
              uploadDate: new Date(),
              documentName: documentName,
              status: "active", // Set initial status,
              semester:semester
          },
      });
        console.log("------------------------------",document);
        return  NextResponse.json(document);

    } catch (err) {
        console.log("[ATTACHMENTS]",err);
        return new NextResponse(`Internal error ${err}`,{status:500});
    }
}