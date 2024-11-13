 "use client";
import { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json'
  },
  params: {
    hostel: 'some-value'
  }
};
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns"; 
import { useRouter } from "next/navigation";
import axios from "axios";

// Define a type for the student (adjust based on your actual student object shape)
 
const hostels = [
    { value: '5', label: '5' }, { value: '3', label: '3' }, { value: '10 C', label: '10 C' },
    { value: '9', label: '9' }, { value: '11', label: '11' }, { value: '6', label: '6' },
    { value: '7', label: '7' }, { value: '8 A', label: '8 A' }, { value: '10 D', label: '10 D' },
    { value: '8 B', label: '8 B' }, { value: '12', label: '12' }, { value: '10 A', label: '10 A' },
    { value: '10 B', label: '10 B' }, { value: '2', label: '2' }, { value: '1', label: '1' },
    { value: '4', label: '4' }
  ];
const WardenPage = () => {
  const [students, setStudents] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hostel, setHostel] = useState<string>(""); // State to hold the hostel name input
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false); // To track when the form is submitted
      const handleChange = (event:any) => {
    event.preventDefault();
    setHostel(event.target.value);
  }; 
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault(); 
      setLoading(true); 

      try {
        const response = await axios.get(`/api/warden/getalldetails`, {
          params: { hostel },
        });
        // console.log(response.data); // List of students
        setStudents(response.data); // Set the response data to your state
      } catch (error) {
        console.error("Error fetching students:", error);
      }finally {
        setLoading(false);
      }

  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
       <div>
       <label htmlFor="hostel-select" className="block text-left mb-1 text-gray-600 font-medium">Select Hostel</label>
       <select
         id="hostel-select"
         value={hostel}
         onChange={handleChange}
         className="block w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-700"
       >
         <option value="" disabled>Select a hostel</option>
         {hostels.map((hostel:any) => (
           <option key={hostel.value} value={hostel.value}>
             {hostel.label}
           </option>
         ))}
       </select>
     </div>
     <Button
      onClick={handleSubmit}
      disabled={loading}
      size="sm"
      className="md:w-auto mt-2"
    >
      Search
    </Button>
      {/* If students found, show the data table */}
      {students && students.length > 0 ? (
        <DataTable columns={columns} data={students} />
      ) : (
        <div className='mt-1'>No students found</div>
      )}
    </div>
  );
};

export default WardenPage;
