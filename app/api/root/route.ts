import { NextResponse } from 'next/server';
import db from '@/lib/prismadb'; 
 

// Define the hostels data
const hostels = [
    { "hostel": "5" },
    { "hostel": "3" },
    { "hostel": "10 C" },
    { "hostel": "9" },
    { "hostel": "11" },
    { "hostel": "6" },
    { "hostel": "7" },
    { "hostel": "8 A" },
    { "hostel": "10 D" },
    { "hostel": "8 B" },
    { "hostel": "12" },
    { "hostel": "10 A" },
    { "hostel": "10 B" },
    { "hostel": "2" },
    { "hostel": "1" },
    { "hostel": "4" }
  ]
export async function POST(req: Request) {
  try {
    // Clear existing hostels (optional)
    await db.hostel.deleteMany({});

    // Insert the hostels using Promise.all
    const result = await Promise.all(
      hostels.map((hostel:any) => 
        db.hostel.create({
          data: hostel,
        })
      )
    );

    return NextResponse.json({ message: 'Hostels seeded successfully', result });
  } catch (error) {
    console.error('Error seeding hostels:', error);
    return NextResponse.json({ message: 'Error seeding hostels', error }, { status: 500 });
  }  
}