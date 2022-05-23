import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { AuthContext } from "../context/auth.context";
import NavbarMenu from "../components/NavbarMenu";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, requestBody)
      .then((response) => {
        const jwt = response.data.authToken;
        console.log("Login was sucessful. JWT token: ", jwt);

        storeToken(jwt);
        authenticateUser();

        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        console.log("error loggin in...", errorDescription);
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="Auth">
      <div className="background-overlay">
        <div className="Auth-form">
          <div className="h1overlay p-4 text-light">
            <h1 className="display-4"> BY YOUR WAY</h1>
            <h2 className="text-info">Keep track of what you are learning</h2>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <Form className="my-4" onSubmit={handleLoginSubmit}>
            <Form.Group className="my-4">
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="success" type="submit" className="my-2">
              Login
            </Button>
          </Form>

          <p>
            Don't have an account?
            <Link to="/signup">
              <Button variant="info" size="sm" className="ml-2">
                Register
              </Button>
            </Link>
          </p>

          <p>
            Come back Homepage ?
            <Link to="/">
              <Button variant="info" size="sm" className="ml-2">
                Home
              </Button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
