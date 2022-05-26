import NavbarMenu from "./NavbarMenu";
// import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import carousel1 from "../../src/assets/carousel1.webp";
import carousel2 from "../../src/assets/carousel2.jpg";
import carousel3 from "../../src/assets/carousel3.jpg";
// import "bootstrap/dist/css/bootstrap.min.css";

function Landing() {
  return (
    <>
      <NavbarMenu />

      <Container className="my-4 mb-3 p-3 background-overlay-landing">
        <Row className="justify-content-center text-center ">
          <Col md="auto">
            <h1 className="mb-3">Website For Learning Tracker</h1>
            <p className="">
              By educators, for educators. We are the most trusted web
              publishing platform to keep track of what you are learning.
            </p>
            <p>
              The Learner Dashboard is a website where you can quickly see where
              you are in a course, what action items you may still have, and
              what courses you are currently enrolled in. Upon login, you will
              automatically be directed to your Learner Dashboard.
            </p>
            <p>
              <strong> Please note</strong>: Learners will only see the tabs and
              sections as applicable to them.{" "}
            </p>
          </Col>
        </Row>
      </Container>
      <Carousel className="d-flex justify-content-center">
        <Carousel.Item>
          <img
            className="d-block mx-auto w-20"
            src={carousel1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block mx-auto w-20"
            src={carousel2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block mx-auto w-20"
            src={carousel3}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default Landing;
