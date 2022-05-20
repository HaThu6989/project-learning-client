import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./Navbar.css";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="Navbar">
      <NavLink to="/">About | </NavLink>
      <NavLink to="/topics"> Topics | </NavLink>
      <NavLink to="/topics/create"> New Topic | </NavLink>
      {isLoggedIn && (
        <>
          <span>Welcome, {user.email} ! </span>
          <button onClick={logOutUser}>Logout</button>
        </>
      )}
      {!isLoggedIn && (
        <>
          <NavLink to="/signup">Register | </NavLink>
          <NavLink to="/login">Login</NavLink>
        </>
      )}
    </nav>
  );
}

export default Navbar;
