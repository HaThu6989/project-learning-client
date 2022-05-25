import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavbarMenu from "../components/NavbarMenu";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";

function EditTopicPage(props) {
  const navigate = useNavigate();

  const { topicId } = useParams();

  const topicDetails = props.topics.find((topic) => topic._id === topicId);

  const [title, setTitle] = useState(topicDetails.title);
  const [description, setDescription] = useState(topicDetails.description);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDetails = {
      title,
      description,
    };

    const storedToken = localStorage.getItem("authToken");
    axios
      .put(`${process.env.REACT_APP_API_URL}/topics/${topicId}`, newDetails, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        props.callbackUpdateTopicList();
        navigate("/topics");
      })
      .catch((e) => console.log("error updating Topic...", e));
  };

  return (
    <>
      <NavbarMenu />

      <Container className="my-4">
        <Card>
          <Card.Header as="h2" className="font-link">
            Edit Topic
          </Card.Header>
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
                  Update !
                </Button>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default EditTopicPage;
