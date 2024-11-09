// app/api/students/[userId].ts

import { NextResponse } from 'next/server';
import db from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
    const { userId } = await auth(); 
    try {
      // Fetch the student details from the database
      if(!userId)       return NextResponse.json({ message: 'Unauthorized'}, { status: 401 });

      const student = await db.student.findUnique({
        where: { userId: userId },
      });

      // Check if the student exists
      if (!student) {
        return NextResponse.json({ message: 'Student not found' }, { status: 404 });
      }
      console.log(student);
      // Return the student details
      return NextResponse.json(student);
    } catch (error) {
      console.error('Error fetching student details:', error);
      return NextResponse.json({ message: 'Error fetching student details' }, { status: 500 });
    } 
}