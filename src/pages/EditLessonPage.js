import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavbarMenu from "../components/NavbarMenu";
import { useEffect } from "react";
import Container from "react-bootstrap/esm/Container";

function EditLessonPage(props) {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  console.log(lessonId);

  const lessonDetails = props.topic.lessons.find(
    (lesson) => lesson._id == lessonId
  );
  console.log(lessonDetails);
  const [title, setTitle] = useState(lessonDetails.title);
  const [description, setDescription] = useState(lessonDetails.description);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/lessons/${lessonId}`)
      .then((response) => {
        console.log(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
      })
      .catch((error) => console.log(error));
  }, [lessonId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLessonUpdate = { title, description };

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/lessons/${lessonId}`,
        newLessonUpdate
      )
      .then((response) => {
        // navigate(`/topics/${topicId}`);
        navigate(`/topics`);
      });
  };

  return (
    <>
      <NavbarMenu />
      <Container className="my-4">
        <h1>Edit Lesson</h1>

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
            Update !
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default EditLessonPage;
