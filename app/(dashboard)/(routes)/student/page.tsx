'use client'
import React, { useState } from 'react';
import Link from 'next/link';
export default function Student() {
   
    return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex space-x-6">
        {/* Box for Upload Document */}
        <div className="bg-white p-6 shadow-lg rounded-lg w-64 text-center">
          <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
          <p className="text-gray-600 mb-4">Upload your documents securely and easily.</p>
          <Link href="/student/upload">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Go to Upload</button>
          </Link>
        </div>

        {/* Box for Register Complaint */}
        <div className="bg-white p-6 shadow-lg rounded-lg w-64 text-center">
          <h2 className="text-xl font-semibold mb-4">Register Complaint</h2>
          <p className="text-gray-600 mb-4">Submit your complaints for prompt assistance.</p>
          <Link href="/complaint">
            <button className="bg-green-500 text-white px-4 py-2 rounded">Go to Complaint</button>
          </Link>
        </div>
      </div>
    </div>
  );
};



