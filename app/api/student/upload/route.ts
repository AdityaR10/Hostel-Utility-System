import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/lib/prismadb";

export async function POST(req: Request) {
    try {
        const { userId } = await auth(); 
        const data = await req.json(); // Parse the JSON bod
        // console.log("Request Data:----------------------------------------", data); // Log the request data for debugging

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const student = await db.student.findUnique({
            where: {
                userId: userId, 
            }
        });

        if (student) {
            return new NextResponse("Already existing Student", { status: 401 });
        } 
        const hostel = await db.hostel.findUnique({
            where: {
                 hostel:data.hostel
            },
        });
        
        if (!hostel) {
            throw new Error("Hostel not found");
        }
        const newStudent = await db.student.create({
            data: { 
                userId: userId,
                name: data.name, 
                email: data.email,
                scholarNumber: data.scholarNumber,
                hostel: {
                    connect: {
                        hostel:data.hostel
                    },
                },
            },
        });

        return NextResponse.json(newStudent);

    } catch (err) {
        console.log("[STUDENT_CREATION]", err);
        return new NextResponse(`Internal error ${err}`, { status: 500 });
    }
}