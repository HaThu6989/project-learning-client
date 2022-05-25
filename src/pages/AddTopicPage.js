import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavbarMenu from "../components/NavbarMenu";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";

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
    <>
      <NavbarMenu />

      <Container className="my-4">
        <Card>
          <Card.Header as="h5">Create new Topic</Card.Header>
          <Card.Body>
            <Card.Text>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
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
                    as="textarea"
                    rows={3}
                    placeholder="Description"
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
            </Card.Text>
            {/* <Button variant="primary" type="submit">
              Create !
            </Button> */}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default AddTopicPage;
