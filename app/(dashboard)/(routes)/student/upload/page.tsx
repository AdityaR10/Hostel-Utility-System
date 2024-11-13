"use client";
import Image from "next/image";
import db from "@/lib/prismadb";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; 
// import { auth } from '@clerk/nextjs/server'
// import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation"; 
import { useEffect } from "react";  
import { AttachmentForm } from "./_components/docs-form";
export default function StudentPage() {
  // const { userId }: { userId: string | null } = await auth();
  const [name, setName] = useState('');
  const [scholarNumber, setScholarNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedHostel, setSelectedHostel] = useState('');
  const [hostel, setHostel] = useState<string>('');
  const [documents, setDocuments] = useState<File[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<any>(null);
  const router = useRouter();
  const hostels = [
    { value: '5', label: '5' }, { value: '3', label: '3' }, { value: '10 C', label: '10 C' },
    { value: '9', label: '9' }, { value: '11', label: '11' }, { value: '6', label: '6' },
    { value: '7', label: '7' }, { value: '8 A', label: '8 A' }, { value: '10 D', label: '10 D' },
    { value: '8 B', label: '8 B' }, { value: '12', label: '12' }, { value: '10 A', label: '10 A' },
    { value: '10 B', label: '10 B' }, { value: '2', label: '2' }, { value: '1', label: '1' },
    { value: '4', label: '4' }
  ];
  // const [block,setBlock] = useState<string>('');
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setDocuments(Array.from(event.target.files));
    }
  };
  const handleChange = (event:any) => {
    event.preventDefault();
    setHostel(event.target.value);
  };
  useEffect(() => {
    const fetchStudentDetails = async () => {
      // const { userId } = await auth(); // Get the userId from Clerk

      try {
        const response = await axios.get(`/api/student/details`);
        setStudent(response.data);
        console.log(response,response.data)
      } catch (error) {
          setStudent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, []);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
  
    // Validate required fields
    if (!name || !email || !scholarNumber || !hostel) {
      setError('All fields are required.');
      return;
    }
  
    try {
      const values = {
        name,
        email,
        scholarNumber, 
        hostel
      };
  
      // Send the data directly
      await axios.post(`/api/student/upload`, values);
      toast.success("Data updated");
      router.refresh();
    } catch (error) {
      console.error("Error during API call:", error);
      toast.error("Something went wrong");
    }
  }; 

  const uploadDocuments = async (studentId: string, files: File[]) => { 
    console.log('Uploading documents for student:', studentId);
    console.log('Files:', files);
  };

  return (
    <div> 
      {loading && <h1>Loading</h1>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !student &&     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">Student Details</h2>

        <div>
          <label htmlFor="name" className="block text-left mb-1 text-gray-600 font-medium">Name</label>
          <input
            id="name"
            type="text"
            className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-left mb-1 text-gray-600 font-medium">Email</label>
          <input
            id="email"
            type="email"
            className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="sno" className="block text-left mb-1 text-gray-600 font-medium">Scholar Number</label>
          <input
            id="sno"
            type="text"
            className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-700"
            value={scholarNumber}
            onChange={(e) => setScholarNumber(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="hostel-select" className="block text-left mb-1 text-gray-600 font-medium">Select Hostel</label>
          <select
            id="hostel-select"
            value={hostel}
            onChange={handleChange}
            className="block w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-700"
          >
            <option value="" disabled>Select a hostel</option>
            {hostels.map((hostel) => (
              <option key={hostel.value} value={hostel.value}>
                {hostel.label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="w-full p-3 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-200">
          Submit
        </button>
      </form>
    </div>}
      {!loading && student &&    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
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
          <p className="text-gray-700">{student.hostelId}</p>
        </div>
      </div>
    </div>}
          <AttachmentForm/> 
    </div>
  );
}
