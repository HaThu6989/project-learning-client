import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavbarMenu from "../components/NavbarMenu";
import Container from "react-bootstrap/esm/Container";

function AddTopicPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTopic = {
      title,
      description,
    };

    const storedToken = localStorage.getItem("authToken");

    axios
      .post(process.env.REACT_APP_API_URL + "/topics", newTopic, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        props.callbackUpdateTopicList();

        navigate("/topics");
      })
      .catch((e) => console.log("error creating topic...", e));
  };

  return (
    <section>
      <NavbarMenu />
      <Container className="my-4">
        <h1>Create a new topic</h1>

        <Form className="my-4" onSubmit={handleSubmit}>
          <Form.Group className="my-4">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              required={true}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="my-4">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={description}
              required={true}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Button variant="success" type="submit" className="my-2">
            Create !
          </Button>
        </Form>
      </Container>
    </section>
  );
}

export default AddTopicPage;
