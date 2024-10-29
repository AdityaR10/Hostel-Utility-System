'use client'
import React, { useState } from 'react';
interface Document {
    id: number;
    title: string;
    fileUrl: string;
  }
export default function UploadDocument() {
    const [headline, setHeadline] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [documents, setDocuments] = useState<Document[]>([]);
  
    // Mock upload function - replace this with actual backend integration
    const uploadDocument = async (headline: string, file: File) => {
      // Simulate upload and return a file URL
      const fileUrl = URL.createObjectURL(file);
      return { id: Date.now(), title: headline, fileUrl };
    };
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        setFile(event.target.files[0]);
      }
    };
  
    const handleUpload = async () => {
      if (!headline || !file) {
        alert("Please provide a headline and choose a document.");
        return;
      }
  
      try {
        const uploadedDoc = await uploadDocument(headline, file);
        setDocuments((prevDocs) => [...prevDocs, uploadedDoc]);
        setHeadline(''); // Reset headline input
        setFile(null); // Clear file input
      } catch (error) {
        console.error("Error uploading document:", error);
      }
    };
  
    const handleDelete = (id: number) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this document?");
      if (confirmDelete) {
        setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
      }
    }
      return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
          <h1 className="text-2xl font-bold mb-8">Admin: Upload Notices and Circulars</h1>
    
          <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md mb-10">
            <h2 className="text-lg font-semibold mb-4">Upload Notice</h2>
    
            {/* Headline Input */}
            <label className="block mb-2 font-medium">Headline:</label>
            <input
              type="text"
              className="border border-gray-300 p-2 rounded w-full mb-4"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Enter headline for the notice"
            />
    
            {/* File Upload Input */}
            <label className="block mb-2 font-medium">Upload Document:</label>
            <input
              type="file"
              className="mb-4"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.png,.docx"
            />
    
            {/* Upload Button */}
            <button
              onClick={handleUpload}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full"
            >
              Upload Notice
            </button>
          </div>
    
          {/* Notices and Circulars List */}
          <div className="w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Notices and Circulars</h2>
            {documents.length > 0 ? (
              <ul>
                {documents.map((doc) => (
                  <li key={doc.id} className="border-b border-gray-300 py-4 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">{doc.title}</h3>
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View Document
                      </a>
                    </div>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No notices or circulars uploaded yet.</p>
            )}
          </div>
        </div>
      );
    }