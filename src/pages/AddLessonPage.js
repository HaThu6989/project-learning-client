import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Modal from "react-bootstrap/Modal";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useEffect } from "react";

function AddLessonPage(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    props.updateTopic();
  }, [user]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { topicId } = props;

    const requestBody = { title, description, url, status, topic: topicId };

    const storedToken = localStorage.getItem("authToken");
    axios
      .post(`${process.env.REACT_APP_API_URL}/lessons`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        //reset form
        setTitle("");
        setDescription("");
        setUrl("");
        setStatus("");

        //update state
        props.updateTopic();

        //close modal
        handleClose();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <Button variant="primary" onClick={handleShow}>
        Create a new Lesson
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>What do you want to learn?</Modal.Title>
        </Modal.Header>
        <Form className="my-4" onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="my-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                required={true}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                required={true}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="my-2">
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="text"
                name="url"
                required={true}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicSelect" className="my-4">
              <Form.Label>Select Status</Form.Label>
              <Form.Control
                as="select"
                value={status}
                required={true}
                name="status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Please select one</option>
                <option value="TO LEARN">TO LEARN</option>
                <option value="LEARNING">LEARNING</option>
                <option value="LEARNED">LEARNED</option>
              </Form.Control>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create !
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default AddLessonPage;
