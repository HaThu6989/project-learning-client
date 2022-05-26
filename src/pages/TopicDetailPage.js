import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavbarMenu from "../components/NavbarMenu";
import AddLessonPage from "./AddLessonPage";
import LessonDetail from "./LessonDetail";
import Container from "react-bootstrap/esm/Container";
import IsPrivate from "../components/isPrivate";
import InputGroup from "react-bootstrap/esm/InputGroup";
import FormControl from "react-bootstrap/esm/FormControl";

function TopicDetailsPage(props) {
  const [topic, setTopic] = useState(null);
  const { topicId } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getOneTopic = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${process.env.REACT_APP_API_URL}/topics/${topicId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneTopic = response.data;
        setTopic(oneTopic);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getOneTopic();
  }, []);

  return (
    <div className="TopicDetails">
      <NavbarMenu />
      <IsPrivate>
        <Container className="my-4">
          {topic && (
            <>
              <h1 className="font-link text-uppercase">{topic.title}</h1>
              <p className="font-italic">{topic.description}</p>
            </>
          )}
          <AddLessonPage updateTopic={getOneTopic} topicId={topicId} />

          <InputGroup className="my-3">
            <FormControl
              type="text"
              placeholder="Search Your Lesson "
              value={searchTerm}
              onChange={handleChange}
            />
          </InputGroup>
          {/* <div className="">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleChange}
            />
          </div> */}

          {topic &&
            topic.lessons
              .filter((lesson) => {
                const lowerFilter = searchTerm.toLowerCase();
                return lesson.title.toLowerCase().includes(lowerFilter);
              })
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((lesson) => (
                <LessonDetail
                  key={lesson._id}
                  topicId={topicId}
                  title={lesson.title}
                  description={lesson.description}
                  url={lesson.url}
                  status={lesson.status}
                  _id={lesson._id}
                  updateTopic={getOneTopic}
                />
              ))}
        </Container>
      </IsPrivate>
    </div>
  );
}

export default TopicDetailsPage;
