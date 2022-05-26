import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavbarMenu from "../components/NavbarMenu";
import { useEffect } from "react";
import Card from "react-bootstrap/esm/Card";
import Container from "react-bootstrap/esm/Container";

function EditLessonPage(props) {
  const { lessons } = props;
  // console.log("props", props);
  const navigate = useNavigate();
  const { lessonId } = useParams();
  // console.log("lesson Id", lessonId);
  // console.log("THIS IS PROPS.LESSONS", lessons);
  const lessonDetails = lessons.find((lesson) => lesson._id === lessonId);
  // console.log("lessonDetails", lessonDetails);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [url, setUrl] = useState(null);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${process.env.REACT_APP_API_URL}/lessons/${lessonId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // console.log(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setUrl(response.data.url);
        setStatus(response.data.status);
      })
      .catch((error) => console.log(error));
  }, [lessonId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLessonUpdate = { title, description, url, status };
    const storedToken = localStorage.getItem("authToken");
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/lessons/${lessonId}`,
        newLessonUpdate,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        navigate(`/topics/${response.data.topic}`);
      });
  };

  if (title === null) {
    return <h1>Loading ...</h1>;
  }

  return (
    <>
      <NavbarMenu />

      <Container className="my-4">
        <Card>
          <Card.Header as="h2" className="font-link">
            Edit Lesson
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    defaultValue={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="my-4">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="my-4">
                  <Form.Label>URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Youtube Tutorial URL"
                    name="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="my-4">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    value={status}
                    name="status"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="TO LEARN">TO LEARN</option>
                    <option value="LEARNING">LEARNING</option>
                    <option value="LEARNED">LEARNED</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
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

export default EditLessonPage;
