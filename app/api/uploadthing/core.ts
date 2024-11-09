import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";
const f = createUploadthing();
const handleAuth = async () => {
    const { userId }: { userId: string | null } = await auth();

    if (!userId) 
    throw new Error("Unauthorized");
    return {userId};
  }
export const ourFileRouter = {
    docsAttachments: f(["pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {})
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
