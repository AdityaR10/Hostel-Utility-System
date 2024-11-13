import { NextResponse } from "next/server";
import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

export async function GET(request: Request) {
  try {
    // Authenticate user
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    } 

    // Parse the query parameter
    const { searchParams } = new URL(request.url);
    const hostel = searchParams.get("hostel");
    console.log('hostel',hostel)
    if (!hostel) {
      return new NextResponse('Hostel not provided', { status: 400 });
    }

    // Find the hostel object
    const hostelobj = await db.hostel.findFirst({
      where: {
        hostel : hostel
        
      },
    });
    if (!hostelobj) {
      return new NextResponse('Hostel not found', { status: 404 });
    }
    console.log("hobj",hostelobj);
    // Check if the user is a warden

    // Fetch students associated with the hostel
    const students = await db.student.findMany({
      where: {
        hostelId: hostelobj.id,
      },
    });
    console.log("-------------",students)
    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 });
  }
}
