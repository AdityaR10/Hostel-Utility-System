 import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, File, Loader2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Document } from "@prisma/client";
// import { Attachment, Course } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface AttachmentFormProps {
//    docs: Document[]
};

const formSchema = z.object({
  url: z.string().min(1),
});

export const AttachmentForm = ({
//   docs
}: AttachmentFormProps) => {
  const [attachments,setAttachments] = useState<any>([]);
  // const [isEditing, setIsEditing] = useState(false);
  // const [deletingId, setDeletingId] = useState<string | null>(null);

  // const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();
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
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/docs/submit`, values);
      toast.success("docs uploaded");
      // toggleEdit();
      // router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
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
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course attachments
        <button onClick={fetchDocs}>fetch available docs</button>
        {!!attachments.length && (
            <>
              {/* <Separator /> */}
              <div className="p-4">
                {attachments.map((attachment:any) => (
                  <a 
                    href={attachment.filePath}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">
                      {attachment.documentName}
                    </p>
                  </a>
                ))}
              </div>
            </>
          )}
        <Button onClick={()=>{}} variant="ghost">
          {/* {isEditing && (
            <>Cancel</>
          )} */}
          {/* {!isEditing && ( */}
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          {/* )} */}
        </Button>
      </div>
      {/* // {!isEditing && ( */}
      //   <>
           
  
      //   </>
      {/* // )} */}
      {/* {isEditing && ( */}
      <Button onClick={getDetails}/>
        <div>
        <FileUpload
            endpoint="docsAttachments"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your students might need to complete the course.
          </div>
        </div>
      {/* )} */}
    </div>
  )
}