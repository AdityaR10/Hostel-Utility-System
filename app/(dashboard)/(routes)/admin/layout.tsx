import { redirect } from "next/navigation";
const AdminLayout = ({
    children
}:{
    children:React.ReactNode;
}) => { 
    return (
        <>{children}</>
    )
}
 
export default AdminLayout;