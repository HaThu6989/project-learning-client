import axios from "axios";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

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
      className="shadow my-4"
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
            <Col>
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
            <Col className="text-right">
              <p>
                URL : <a href={props.url}>{props.url}</a>
              </p>
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>{props.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default LessonDetail;
