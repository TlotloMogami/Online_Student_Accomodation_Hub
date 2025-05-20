import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider"
import { DashboardLayout, Layout } from "./DashboardLayout";

export const ProtectedPage = () => {
    const {user} = useAuth();
    console.log('User at ProtectedPage: ', user)

    if(!user){
        return <Navigate to={'/sign-in'} replace/>
    }

    return <Outlet/>
}