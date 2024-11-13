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
        const id = searchParams.get('id');
        if(!semester || !id) 
            return NextResponse.json({ error: 'Missing or invalid parameters' }, { status: 400 });
        // Check if userId is present
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const semesterNumber = parseInt(semester, 10);
        // Fetch all documents for the student
        const documents = await db.document.findMany({
            where: {
                studentId: id,
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