import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ children, loggedIn }) => {
    if (loggedIn){
      return children;
    }
  
    return <Redirect to="/signin" />
  }

export default ProtectedRoute;