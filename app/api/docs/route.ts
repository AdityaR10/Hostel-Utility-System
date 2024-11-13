// pages/api/students/fetchDocuments.ts
import { auth } from "@clerk/nextjs/server"; // Adjust this import based on your authentication method
import { NextResponse } from "next/server";
import db from "@/lib/prismadb"; // Adjust the import based on your project structure

export async function GET(req: Request) {
    try {
        // Authenticate the user and get the userId
        const { userId } = await auth();
        const { searchParams } = new URL(req.url);
        const semester = searchParams.get('semester');
        if(!semester) 
            return NextResponse.json({ error: 'Missing or invalid semester parameter' }, { status: 400 });
        // Check if userId is present
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Find the student associated with the userId
        const student = await db.student.findUnique({
            where: {
                userId: userId,
            },
            select: {
                id: true, // Select only the id field
            },
        });

        // Check if student exists
        if (!student) {
            return new NextResponse("Student not found", { status: 404 });
        }
        const semesterNumber = parseInt(semester, 10);
        // Fetch all documents for the student
        const documents = await db.document.findMany({
            where: {
                studentId: student.id,
                semester:semesterNumber
            },
            orderBy: {
                uploadDate: 'desc', // Optional: Order by upload date
            },
        });
        console.log(documents);
        if(!documents) return new NextResponse("Docs not uploaded or found",{status:404});
        // Return the documents as JSON
        return NextResponse.json(documents);
    } catch (err) {
        console.error("[FETCH_DOCUMENTS]", err);
        return new NextResponse(`Internal error: ${err}`, { status: 500 });
    }
}