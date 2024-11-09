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
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [scholarNumber, setScholarNumber] = useState<string>('');
  const [hostelNumber, setHostelId] = useState<string>('');
  const [documents, setDocuments] = useState<File[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<any>(null);
  const router = useRouter();
  const [block,setBlock] = useState<string>('');
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setDocuments(Array.from(event.target.files));
    }
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
    if (!username || !password || !email || !scholarNumber || !hostelNumber) {
      setError('All fields are required.');
      return;
    }
  
    try {
      const values = {
        username,
        password,
        email,
        scholarNumber,
        hostelNumber,
        block,
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
      <h1>Create Student</h1>
      {loading && <h1>Loading</h1>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !student && <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            // required
          />
        </div>
        <div>
          <label>Block:</label>
          <input
            type="text"
            value={block}
            onChange={(e) => setBlock(e.target.value)}
            // required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // required
          />
        </div>
        <div>
          <label>Scholar Number:</label>
          <input
            type="text"
            value={scholarNumber}
            onChange={(e) => setScholarNumber(e.target.value)}
            // required
          />
        </div>
        <div>
          <label>Hostel ID:</label>
          <input
            type="text"
            value={hostelNumber}
            onChange={(e) => setHostelId(e.target.value)}
            // required
          />
        </div>
       
        <button type="submit">Create Student</button>
      </form> }
      {!loading && student &&  <div>
            <h2>Student Details</h2>
            <p><strong>Username:</strong> {student.username}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Scholar Number:</strong> {student.scholarNumber}</p>
            <p><strong>Hostel:</strong> {student.hostelId}</p>
            {/* <h3>Documents</h3> */}
            {/* <ul>
                {student.documents.map((doc) => (
                    <li key={doc.id}>{doc.title}</li>
                ))}
            </ul> */}
        </div>}
          <AttachmentForm/> 
    </div>
  );
}
