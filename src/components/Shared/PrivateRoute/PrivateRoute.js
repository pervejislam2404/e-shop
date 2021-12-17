import React from 'react';
import {  Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import loader from '../../../loader.gif';

const PrivateRoute = ({children,...rest}) => {
    const user = useSelector((state)=> state.stateContainer.user);
    const isLoading = useSelector((state)=> state.stateContainer.isLoading);
    const location = useLocation()  
    console.log(user);

    if(isLoading){
        return <div className="d-flex justify-content-center">
        <img src={loader} alt="" />
       </div>
    }
    if (!user?.email) {
        return <Navigate to="/login" state={{ from: location }} />;
      }
    console.log('came private route')
      return children;
};

export default PrivateRoute;