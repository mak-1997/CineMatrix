import React from 'react';
import {Navigate, useLocation,useNavigate} from 'react-router-dom';
import {AuthContext} from '../contexts/AuthContextProvider';

export const Private_Route = ({children}) => {
    const location = useLocation();
    const {token, admin_flag} = React.useContext(AuthContext);
    if(!token){
        return <Navigate to="/user/login" replace state={location.pathname} />
    }
    return children;
}

export const Admin_Route = ({children}) => {
    const location = useLocation();
    const {token, admin_flag} = React.useContext(AuthContext);
    if(!admin_flag){
        return <Navigate to="/admin/login" replace state={location.pathname} />
    }
    return children;
}