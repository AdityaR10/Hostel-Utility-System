// app/api/students/[userId].ts

import { NextResponse } from 'next/server';
import db from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';

export async function GET(req:Request) {
    const { userId } = await auth(); 
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if(!id)
        return NextResponse.json({error: "id is required"}, {status: 400});
    try {
      // Fetch the student details from the database
      if(!userId)       return NextResponse.json({ message: 'Unauthorized'}, { status: 401 });
      console.log(userId)
      const student = await db.student.findUnique({
        where: { id: id },
      });

      // Check if the student exists
      if (!student) {
        return NextResponse.json({ message: 'Student not found' }, { status: 400});
      }
      console.log(student);
      const hostel = await db.hostel.findUnique({
        where: { id: student.hostelId },
        select:{
          hostel:true,
        }
      })
      if (!hostel) {
        return NextResponse.json({ message: 'hostel not found' }, { status: 400});
      }
      // Return the student details
      return NextResponse.json([student,hostel]);
    } catch (error) {
      console.error('Error fetching student details:', error);
      return NextResponse.json({ message: 'Error fetching student details' }, { status: 500 });
    } 
}