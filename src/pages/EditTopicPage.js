import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function EditTopicPage(props) {
  const navigate = useNavigate();

  const { topicId } = useParams();

  const topicDetails = props.topics.find((topic) => topic._id === topicId); // get the details of the Topic that we're trying to edit

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
    <section className="EditTopicPage">
      <h1>Edit</h1>

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
        <Form.Group>
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
          Create
        </Button>
      </Form>
    </section>
  );
}

export default EditTopicPage;
