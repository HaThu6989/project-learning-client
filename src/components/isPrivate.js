import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
// import LoginPage from "../pages/LoginPage";
// import SignupPage from "../pages/SignupPage";
import Spinner from "react-bootstrap/Spinner";
import { Navigate } from "react-router-dom";

function IsPrivate(props) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (!isLoggedIn) {
    return <Navigate to="/login" />;
  } else if (isLoggedIn) {
    return props.children;
  }
}

export default IsPrivate;
