import { Navigate } from "react-router-dom";

const RequiredAuth = ({ children , isAuth}) => {

  return isAuth ? children : <Navigate to="/login" />
    
  
}

export default RequiredAuth;
