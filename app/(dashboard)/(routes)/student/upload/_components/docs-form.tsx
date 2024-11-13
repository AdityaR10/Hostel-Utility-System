 import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, File, Loader2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Document } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Attachment, Course } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

 
const documentOptions = [
  { label: "Semester Registration Receipt", value: "SemesterRegistrationReceipt" },
  { label: "Mess Receipt", value: "MessReceipt" },
  { label: "Hostel Fees Receipt", value: "HostelFeesReceipt" },
];
  const formSchema = z.object({
    url: z.string().url({ message: "Invalid URL format" }),
    documentName: z.enum(["SemesterRegistrationReceipt", "MessReceipt", "HostelFeesReceipt"]),
    semester: z.number().int().min(1, { message: "Semester must be a positive integer" }),
  });

export const AttachmentForm = () => {
  const [attachments,setAttachments] = useState<any>([]); 
  const router = useRouter();
  type FormData = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const getDetails = async () => {
    try {
      const res = await axios.get(`/api/student/details`);
      toast.success("success");
      console.log(res);
      // toggleEdit();
      // router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }
  const fetchDocs = async () => {
    try {
      const res = await axios.get(`/api/docs`);
      toast.success("success");
      console.log(res);
      setAttachments(res.data);
      // toggleEdit();
      // router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }
  const handleFileChange = (url?: string) => {
    if (url) {
      // Set the URL into form state
      setValue("url", url, { shouldValidate: true });
      
      // Get current form data (documentName, semester) to submit
      const formData : FormData = getValues();
      // Trigger onSubmit immediately after file upload
      onSubmit(formData);
    }
  };
  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      await axios.post(`/api/docs/submit`, data);
      toast.success("docs uploaded");
      // toggleEdit();
      // router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };
  const onSubmi = async () => {
    // try {
    //   await axios.post(`/api/root`);
    //   toast.success("docs uploaded");
    //   // toggleEdit();
    //   // router.refresh();
    // } catch {
    //   toast.error("Something went wrong");
    // }
  };

  const onDelete = async (id: string) => {
    try {
      // setDeletingId(id);
    //   await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      // setDeletingId(null);
    }
  }

  return (
    // <div className="mt-6 border bg-slate-100 rounded-md p-4">
    //   <div className="font-medium flex items-center justify-between">
    //     Docs attachments
    //     <button onClick={fetchDocs}>fetch available docs</button>
    //     {!!attachments.length && (
    //         <>
    //           {/* <Separator /> */}
    //           <div className="p-4">
    //             {attachments.map((attachment:any) => (
    //               <a 
    //                 href={attachment.filePath}
    //                 target="_blank"
    //                 key={attachment.id}
    //                 className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
    //               >
    //                 <File />
    //                 <p className="line-clamp-1">
    //                   {attachment.documentName}
    //                 </p>
    //               </a>
    //             ))}
    //           </div>
    //         </>
    //       )}
    //     <Button onClick={onSubmi} variant="ghost">
    //       {/* {isEditing && (
    //         <>Cancel</>
    //       )} */}
    //       {/* {!isEditing && ( */}
    //         <>
    //           <PlusCircle className="h-4 w-4 mr-2" />
    //           Add a file
    //         </>
    //       {/* )} */}
    //     </Button>
    //   </div>
    //   {/* // {!isEditing && ( */}
    //   //   <>
           
  
    //   //   </>
    //   {/* // )} */}
    //   {/* {isEditing && ( */}
    //   <Button onClick={getDetails}/>
    //     <div>
    //     <FileUpload
    //         endpoint="docsAttachments"
    //         onChange={(url) => {
    //           if (url) {
    //             onSubmit({ url: url });
    //           }
    //         }}
    //       />
    //       <div className="text-xs text-muted-foreground mt-4">
    //         Add anything your students might need to complete the course.
    //       </div>
    //     </div>
    //   {/* )} */}
    // </div>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-semibold text-center text-gray-700">Upload Document</h2>

      {/* Document Name */}
      <div>
        <label className="block text-left mb-1 font-medium text-gray-600">Document Name</label>
        <select
          {...register("documentName")} // Correct usage of register
          className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-700"
        >
          <option value="" disabled>Select a document type</option>
          {documentOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* {errors.documentName && (
          <p className="text-red-500 text-sm mt-1">{errors.documentName.message}</p>
        )} */}
      </div>

      {/* Semester */}
      <div>
        <label className="block text-left mb-1 font-medium text-gray-600">Semester</label>
        <input
          type="number"
          {...register("semester", { valueAsNumber: true })}
          className="w-full p-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-700"
          placeholder="Enter semester"
        />
        {/* {errors.semester && (
          <p className="text-red-500 text-sm mt-1">{errors.semester.message}</p>
        )} */}
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-left mb-1 font-medium text-gray-600">Upload Document</label>
        <FileUpload
          endpoint="docsAttachments"
          onChange={handleFileChange}
        />
        {/* {errors.url && (
          <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>
        )} */}
      </div>

      {/* Submit Button */}
      {/* <button
        type="submit"
        className="w-full mt-6 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-200"
      >
        Submit Document
      </button> */}
    </form>
  </div>
);
}