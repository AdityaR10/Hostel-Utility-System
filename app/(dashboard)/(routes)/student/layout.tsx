import { auth } from "@clerk/nextjs/server";  
import { redirect } from "next/navigation";
const StudentLayout = async({
    children
}:{
    children:React.ReactNode;
}) => {
    const { userId }: { userId: string | null } = await auth();
    if(!userId){
        return redirect("/");
    }

    return (
        <>{children}</>
    )
}
 
export default StudentLayout;