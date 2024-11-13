'use client'
import React, { useState } from 'react';
import Link from 'next/link';
export default function Student() {
   
    return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex space-x-6">
        {/* Box for Document */}
        <div className="bg-white p-6 shadow-lg rounded-lg w-64 text-center">
          <h2 className="text-xl font-semibold mb-4">See Documents</h2>
          <p className="text-gray-600 mb-4">See Students documents securely and easily.</p>
          <Link href="/hostel/details">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Documents Verification</button>
          </Link>
        </div>

        {/* Box for Seeing Complaint  */}
        <div className="bg-white p-6 shadow-lg rounded-lg w-64 text-center">
          <h2 className="text-xl font-semibold mb-4">See Complaints</h2>
          <p className="text-gray-600 mb-4">View complaints for prompt solution.</p>
          <Link href="/complaint">
            <button className="bg-green-500 text-white px-4 py-2 rounded">Go to Complaint</button>
          </Link>
        </div>
      </div>
    </div>
  );
};



