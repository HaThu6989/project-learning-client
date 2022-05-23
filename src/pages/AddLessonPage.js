import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";

function AddLessonPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { topicId } = props;
    const requestBody = { title, description, url, status, topicId };

    axios
      .post(`${process.env.REACT_APP_API_URL}/lessons`, requestBody)
      .then((response) => {
        setTitle("");
        setDescription("");
        setUrl("");
        setStatus("");
        props.updateTopic();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <h3>Create a new Lesson</h3>
      <Form className="my-4" onSubmit={handleSubmit}>
        <Form.Group className="my-2">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            name="title"
            required={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-2">
          <Form.Label>URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Youtube Tutorial URL"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicSelect" className="my-4">
          <Form.Label>Select Status</Form.Label>
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
          Creat!
        </Button>
      </Form>
    </Container>
  );
}

export default AddLessonPage;
