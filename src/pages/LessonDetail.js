import axios from "axios";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import editIcon from "../../src/assets/pencil.svg";
import deleteIcon from "../../src/assets/trash.svg";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/esm/Button";

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
    <Card
      className="shadow my-4 cardOneLesson"
      border={
        props.status === "LEARNED"
          ? "success"
          : props.status === "LEARNING"
          ? "warning"
          : "danger"
      }
    >
      <Card.Body>
        <Card.Title>
          <Row>
            <Col className="col col-lg-10">
              <p className="mb-3 smaller-input">{props.title}</p>
              <Badge
                className="p-2"
                pill
                bg={
                  props.status === "LEARNED"
                    ? "success"
                    : props.status === "LEARNING"
                    ? "warning"
                    : "danger"
                }
              >
                {props.status}
              </Badge>
            </Col>
            <Col className="text-right col col-lg-1">
              <Nav.Link
                className="btn-floating"
                to={`/lessons/${props._id}/edit`}
                as={Link}
              >
                <img src={editIcon} alt="edit" width="24" height="24" />
              </Nav.Link>
            </Col>

            <Col className="text-right col col-lg-1">
              <Button
                className="post-button"
                onClick={() => deleteLesson(props._id)}
              >
                <img src={deleteIcon} alt="delete" width="24" height="24" />
              </Button>
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <Card.Text>
          URL : <a href={props.url}>{props.url}</a>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default LessonDetail;
