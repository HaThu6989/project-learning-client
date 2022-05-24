import NavbarMenu from "./NavbarMenu";
// import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
function Landing() {
  return (
    <>
      <NavbarMenu />

      <Container className="mt-5 p-3 background-overlay-landing">
        <Row className="justify-content-center text-center ">
          <Col md="auto">
            <h1 className="mb-3">Website For E-Learning</h1>
            <p className="">
              By educators, for educators. We are the most trusted web
              publishing platform to keep track of what you are learning.
            </p>
            <p>
              The Learner Dashboard is a centralized location where you can
              quickly see where you are in a course, what action items you may
              still have, and what courses you are currently enrolled in. Upon
              login, you will automatically be directed to your Learner
              Dashboard.
            </p>
            <p>
              Please note: Learners will only see the tabs and sections as
              applicable to them and their institution.{" "}
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Landing;
