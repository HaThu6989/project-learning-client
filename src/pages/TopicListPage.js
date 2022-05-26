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
import editIcon from "../../src/assets/pencil.svg";
import deleteIcon from "../../src/assets/trash.svg";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function TopicListPage(props) {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    props.callbackUpdateTopicList();
  }, [user]);

  const deleteTopic = (topicId) => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${process.env.REACT_APP_API_URL}/topics/${topicId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        props.callbackUpdateTopicList();
      })
      .catch((e) => console.log("error deleting Topic...", e));
  };

  const renderTopics = () => {
    const body = (
      <Container className="mt-4">
        <h1 className="mb-3 font-linkListTopic ">LIST OF YOUR TOPICS</h1>
        <Row>
          {props.topics.map((elm) => (
            <Col key={elm._id} className="my-2" xs lg="3">
              <Card className="shadow" border="success">
                <Card.Body className="p-3">
                  <Card.Title>
                    <p className="post-title">{elm.title}</p>
                  </Card.Title>
                  <Card.Text>
                    <Row className="cols-md-4 mt-3 ml-5">
                      <Col className="text-right col col-lg-4">
                        <Nav.Link
                          className="post-button"
                          to={`/topics/${elm._id}`}
                          as={Link}
                        >
                          <img src="https://img.icons8.com/ios/30/000000/details-pane.png" />
                        </Nav.Link>
                      </Col>

                      <Col className="text-right col col-lg-4">
                        <Nav.Link
                          className="post-button"
                          to={`/topics/${elm._id}/edit`}
                          as={Link}
                        >
                          <img
                            src={editIcon}
                            alt="edit"
                            width="24"
                            height="24"
                          />
                        </Nav.Link>
                      </Col>

                      <Col className="text-right col col-lg-4">
                        <Button
                          className="post-button"
                          onClick={() => deleteTopic(elm._id)}
                        >
                          <img
                            src={deleteIcon}
                            alt="delete"
                            width="24"
                            height="24"
                          />
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
    return body;
  };

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
        {props.topics === null && (
          <div className="spinner-container">
            <Spinner animation="border" variant="info" />
          </div>
        )}
        {props.topics.length > 0 && <>{renderTopics()}</>}
      </section>
    </>
  );
}

export default TopicListPage;
