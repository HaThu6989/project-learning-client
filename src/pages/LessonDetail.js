import axios from "axios";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

function LessonDetail(props) {
  const deleteLesson = (lessonId) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/lessons/${lessonId}`)
      .then(() => {
        props.updateTopic();
      })
      .catch((e) => console.log("error deleting Lesson...", e));
  };

  return (
    <div className="">
      <h3>Title: {props.title}</h3>
      <p>Id: {props._id}</p>
      <p>Description: {props.description}</p>
      <p>URL: {props.url}</p>
      <p>Status: {props.status}</p>
      <Nav.Link
        className="btn-floating"
        to={`/lessons/${props._id}/edit`}
        as={Link}
      >
        Edit Lesson
      </Nav.Link>

      <Button className="btn-floating" onClick={() => deleteLesson(props._id)}>
        Delete
      </Button>
    </div>
  );
}

export default LessonDetail;
