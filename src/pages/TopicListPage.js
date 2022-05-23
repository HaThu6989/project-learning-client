import NavbarMenu from "../components/NavbarMenu";
import axios from "axios";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";

function TopicListPage(props) {
  const deleteTopic = (topicId) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/topics/${topicId}`)
      .then(() => {
        props.callbackUpdateTopicList();
      })
      .catch((e) => console.log("error deleting Topic...", e));
  };

  let body = (
    <Container className="mt-4">
      <h1 className="mb-3">LIST OF YOUR TOPICS</h1>
      <Row>
        {props.topics.map((elm) => (
          <Col key={elm._id} className="my-2" xs lg="3">
            <Card className="shadow" border="success">
              <Card.Body>
                <Card.Title>
                  <p className="post-title">{elm.title}</p>
                </Card.Title>
                <Card.Text>
                  <Row className="cols-md-4 mx-auto">
                    <Col>
                      <Nav.Link
                        className="btn-floating"
                        to={`/topics/${elm._id}`}
                        as={Link}
                      >
                        Details
                      </Nav.Link>
                    </Col>

                    <Col>
                      <Nav.Link
                        className="btn-floating"
                        to={`/topics/${elm._id}/edit`}
                        as={Link}
                      >
                        Edit
                      </Nav.Link>
                    </Col>

                    <Col>
                      <Button
                        className="btn-floating"
                        onClick={() => deleteTopic(elm._id)}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );

  return (
    <>
      <NavbarMenu />

      <section>
        {props.topics.length === 0 && (
          <>
            <Card className="text-center mx-5 my-5">
              <Card.Header as="h1">Hi </Card.Header>
              <Card.Body>
                <Card.Title>Welcome to Learned Dashboard</Card.Title>
                <Card.Text>
                  Click the link below to track your first skill to learn
                </Card.Text>
                <Nav.Link
                  className="btn-floating"
                  to={`/topics/create`}
                  as={Link}
                >
                  Create a new Topic
                </Nav.Link>
              </Card.Body>
            </Card>
          </>
        )}
        {props.topics.length === null && (
          <div className="spinner-container">
            <Spinner animation="border" variant="info" />
          </div>
        )}
        {props.topics.length > 0 && <>{body}</>}
      </section>
    </>
  );
}

export default TopicListPage;
