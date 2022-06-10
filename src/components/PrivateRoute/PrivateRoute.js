import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { userContext } from '../../App';

const PrivateRoute = () => {
      const [loggedInUser, setloggedInUser] = useContext(userContext);
      const location = useLocation()

      if(!loggedInUser.email){
            return  <Navigate to={'/login'} state={{from :location}}></Navigate>   
         } 
      return <Outlet/>
               
            
            
      
};

export default PrivateRoute;