"use client";
import React, { useState } from "react";
import { File } from "lucide-react";
import axios from "axios";

interface Attachment {
  id: string;
  filePath: string;
  documentName: string;
  semester: number;
}


export default function DisplayUploadedDocuments() {
  const [semester, setSemester] = useState<number>(1);
  const [attachments,setAttachments] = useState<any>([]); 
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchDocuments = async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedDocuments = await axios.get("/api/docs",{params:{semester}})
      setAttachments(fetchedDocuments.data);
      console.log(fetchedDocuments);
    } catch (err) {
      setError("Failed to load documents.");
    } finally {
      setLoading(false);
    }
  };
  // Filter attachments based on the selected semester 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Uploaded Documents</h2>

        {/* Semester Input */}
        <div className="mb-6">
          <label className="block text-left font-medium text-gray-600">Select Semester</label>
          <input
            type="number"
            value={semester}
            onChange={(e) => setSemester(Number(e.target.value))}
            className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-700"
            placeholder="Enter semester"
          />
        </div>
        <div className="mb-6">
          <button
            onClick={handleFetchDocuments}
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Loading..." : "Fetch Documents"}
          </button>
        </div>
         {/* Display Error */}
         {error && <p className="text-red-500 text-sm">{error}</p>}
        {/* Display Uploaded Documents */}
        <div className="p-4">
          {!!attachments.length ? (
            attachments.map((attachment:any) => (
              <a
                href={attachment.filePath}
                target="_blank"
                key={attachment.id}
                className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline mb-3"
              >
                <File className="mr-3" />
                <p className="line-clamp-1">{attachment.documentName}</p>
              </a>
            ))
          ) : (
            <p className="text-gray-500">No documents found for this semester.</p>
          )}
        </div>
      </div>
    </div>
  );
}
 
