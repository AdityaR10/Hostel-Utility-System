"use client";
import React, { useState ,useEffect} from "react";
import { File } from "lucide-react";
import axios from "axios";

interface Attachment {
  id: string;
  filePath: string;
  documentName: string;
  semester: number;
}


export default function DisplayUploadedDocuments({
  params,
}: {
  params: { id: string };
}) {
  const [semester, setSemester] = useState<number>(1);
  const [attachments,setAttachments] = useState<any>([]); 
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDet, setLoadingDet] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [student, setStudent] = useState<any>(null);
  const [hostel,setHostel] = useState('');
  const { id } = params;
  useEffect(() => {
    const fetchStudentDetails = async () => { 
      try {
        const response = await axios.get(`/api/student/byId`, {
          params: { id },
        });
        console.log(response.data); // List of students
        setStudent(response.data[0]); // Set the response data to your state
        setHostel(response.data[1].hostel);
        setLoadingDet(false);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudentDetails();
  }, []);
  const handleFetchDocuments = async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedDocuments = await axios.get("/api/docs/id",{params:{semester,id}})
      setAttachments(fetchedDocuments.data);
      console.log(fetchedDocuments);
    } catch (err) {
      // setError("Failed to load documents.");
    } finally {
      setLoading(false);
    }
  };
  // Filter attachments based on the selected semester 

  return (
    <>
    {!student && loadingDet && <div className="flex items-center justify-center h-1/4 bg-gray-100 px-4 py-5">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">loading student details</h2>
        </div></div>}
    {student &&    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Student Details</h2>

        {/* Display Username */}
        <div className="mb-4">
          <label className="block text-left font-medium text-gray-600">Username:</label>
          <p className="text-gray-700">{student.name}</p>
        </div>

        {/* Display Email */}
        <div className="mb-4">
          <label className="block text-left font-medium text-gray-600">Email:</label>
          <p className="text-gray-700">{student.email}</p>
        </div>

        {/* Display Scholar Number */}
        <div className="mb-4">
          <label className="block text-left font-medium text-gray-600">Scholar Number:</label>
          <p className="text-gray-700">{student.scholarNumber}</p>
        </div>

        {/* Display Hostel */}
        <div className="mb-4">
          <label className="block text-left font-medium text-gray-600">Hostel:</label>
          <p className="text-gray-700">{hostel}</p>
        </div>
      </div>
    </div>}
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
    </>
  );
}
 
