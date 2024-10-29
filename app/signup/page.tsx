'use client'
import React, { useState } from 'react';
import Link from 'next/link';
export default function Signup() {
   
    return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex space-x-6">
        {/* Box for Upload Document */}
        <div className="bg-white p-6 shadow-lg rounded-lg w-64 text-center">
          <h2 className="text-xl font-semibold mb-4">Upload Notices and Circulars</h2>
          <p className="text-gray-600 mb-4">Here COW office can upload notices and circulars.</p>
          <Link href="/signup/uploaddocument">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Upload Notices and Circulas</button>
          </Link>
        </div>

        {/* Box for Register Complaint */}
        <div className="bg-white p-6 shadow-lg rounded-lg w-64 text-center">
          <h2 className="text-xl font-semibold mb-4">Create Credentials</h2>
          <p className="text-gray-600 mb-4">Here COW office can create credentials for Hostel .</p>
          <Link href="/signup/createcredentials">
            <button className="bg-green-500 text-white px-4 py-2 rounded">Create Username and Password</button>
          </Link>
        </div>
      </div>
    </div>
  );
};



