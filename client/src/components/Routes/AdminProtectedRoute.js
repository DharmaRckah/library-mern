
import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth.js";
import axios from "axios";

import Loader from './../loader/LoaderHand';

export const AdminProtectedRoute = () => {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const response = await axios.get("/api/v1/auth/Admin-auth");
        if (response.data.ok) {
          setOk(true);  
        } else {
          setOk(false); 
        }
      } catch (error) {
        console.error("Error during authentication check", error);
        setOk(false);  
      }
    };

    if (auth?.AccessToken) {
      authCheck(); 
    } else {
      setOk(false); 
    }

   
    const loaderTimeout = setTimeout(() => {
      setLoading(false);
      if (!ok) {
        navigate("/access-denied"); 
      }
    }, 2000);

    
    return () => clearTimeout(loaderTimeout);
  }, [auth, navigate, ok]);

 
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return ok ? <Outlet /> : null; // Render child components or nothing if not authenticated
};

export default AdminProtectedRoute;
