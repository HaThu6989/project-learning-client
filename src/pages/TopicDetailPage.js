import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavbarMenu from "../components/NavbarMenu";
import AddLessonPage from "./AddLessonPage";
import LessonDetail from "./LessonDetail";
import Container from "react-bootstrap/esm/Container";
import IsPrivate from "../components/isPrivate";

function TopicDetailsPage(props) {
  const [topic, setTopic] = useState(null);
  const { topicId } = useParams();

  const getOneTopic = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/topics/${topicId}`)
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
        <Container className="mt-4">
          {topic && (
            <>
              <h1 className="font-link text-uppercase">{topic.title}</h1>
              <p className="font-italic">{topic.description}</p>
            </>
          )}
          <br />
          <AddLessonPage updateTopic={getOneTopic} topicId={topicId} />

          {topic &&
            topic.lessons.map((lesson) => (
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
