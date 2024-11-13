import Image from "next/image";
import db from "@/lib/prismadb";
import { auth } from '@clerk/nextjs/server'
import Link from "next/link";
// import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation"; 
import { useEffect } from "react";  
export default async function Dashboard() {
  const { userId } = await auth();
  if(!userId){
    return redirect("/");
}
// else
//   console.log("userId = ",userId);
  return (
    
    <div>
    <header className="bg-blue-900 text-white">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="flex items-center">
          <img
            src="https://www.manit.ac.in/sites/default/files/documents/Manit%20Logo%20color_0.jpg"
            alt="MANIT Logo"
            className="mr-3 w-32 h-auto"  // Responsive width for the logo
          />
          <Link href="getfeedback">
            <span className="text-xl font-bold">MANIT</span>
          </Link>
        </div>
        <nav className="flex space-x-4 text-sm md:text-base">
          <a href="feedback" className="text-white hover:underline">
            Feedback
          </a>
          <a href="hostel" className="text-white hover:underline">
            Hostel-Login
          </a>
          <a href="student" className="text-white hover:underline">
            Students Dashboard
          </a>
          <a href="signup" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            COW Office Login
          </a>
        </nav>
      </div>
    </header>
  
    <main>
      <section className="bg-blue-800 text-white py-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl font-bold mb-4">Here we can see all the notices, circulars and other information</h1>
            <p className="mb-6">We need to get the document from the COW page and show it here. When this button is clicked, all the latest notices should be shown.</p>
            {/* Add your button for fetching notices */}
            {/* <button className="bg-blue-500 text-white px-6 py-3 rounded">Explore Notices</button> */}
          </div>
          <div className="md:w-1/2">
            <img
              src="https://placehold.co/600x400"
              alt="People working on laptops"
              className="rounded-lg w-full"
            />
          </div>
        </div>
      </section>
  
      <section className="py-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://placehold.co/400x300"
                alt="Group of people discussing"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">Hostel Authorities Login</h2>
                <p className="text-gray-700 mb-4">You’ll benefit from a friendly, open and welcoming work environment.</p>
                <Link href="/hostel">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Go To Hostel</button>
                </Link>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://placehold.co/400x300"
                alt="People collaborating on a project"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">Student Dashboard</h2>
                <p className="text-gray-700 mb-4">Contrary to popular belief, Lorem Ipsum is not simply random text.</p>
                <Link href="student">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Read More</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  
    <footer className="bg-blue-900 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 MANIT. All rights reserved. <br /> Mentored by: Dr. Meenu Chawla, CSE DEPARTMENT: Created by Aditya and Akshat</p>
      </div>
    </footer>
  </div>
  
);
}
