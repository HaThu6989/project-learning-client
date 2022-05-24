import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        console.log("eror....", error);
        const errorDescription = error.response.data.message;
        console.log("error creating account", errorDescription);
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
          <Form className="my-4" onSubmit={handleSignupSubmit}>
            <Form.Group className="my-4">
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                required={true}
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
              Register
            </Button>
          </Form>
          <p>
            Already have an account?
            <Link to="/login">
              <Button variant="info" size="sm" className="ml-2">
                Login
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

export default SignupPage;
