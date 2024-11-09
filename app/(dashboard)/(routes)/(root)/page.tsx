import Image from "next/image";
import db from "@/lib/prismadb";
import { auth } from '@clerk/nextjs/server'
// import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation"; 
import { useEffect } from "react";  
export default async function Dashboard() {
  const { userId }: { userId: string | null } = await auth();
  if(!userId){
    return redirect("/");
}
else
  console.log("userId = ",userId);
  return (
    <div className="p-6 space-y-4">
      Root page
  </div>
  );
}
