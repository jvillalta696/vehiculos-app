import { Navigate } from "react-router-dom";
import Loading from "../components/loadings/Loading";
import { useAuth } from "../contexts/AuthContext";

import React from 'react'

const ProtectedRoute = ({children}) => {
    const {user,loading}=useAuth()
    if(loading)return (<Loading/>)
    if (!user)return <Navigate to='/login'/>
    return <>{children}</>
}

export default ProtectedRoute
