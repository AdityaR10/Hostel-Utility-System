// app/api/warden/route.ts

import { NextResponse } from 'next/server'; 
import db from '@/lib/prismadb';
import { auth } from '@clerk/nextjs/server';
export async function POST(request: Request) { 

  try {
    // Parse the request body
    const { username, password, email, hostel } = await request.json();
    const {userId} = await auth();
    if(!userId)
      return new NextResponse('Unauthorized', { status: 401 });
    // Validate input
    if (!username || !password || !email || !hostel) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Check if the hostel exists
    const mid = await db.hostel.findUnique({
      where: { hostel:hostel },
    });

    if (!mid) {
      return NextResponse.json({ message: 'Hostel not found' }, { status: 404 });
    }
 

    // Create new warden in the database
    const newWarden = await db.warden.create({
      data: {
        username,
        password: password, 
        email,
        userId,
        hostelId: mid.id,  // Reference mid.id as hostelId
      },
    });
    

    // Return the created warden's details
    return NextResponse.json(newWarden, { status: 201 });
  } catch (error) {
    console.error('Error creating warden credentials:', error);
    return NextResponse.json({ message: 'Error creating warden credentials' }, { status: 500 });
  }
}
