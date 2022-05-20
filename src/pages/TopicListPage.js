import Navbar from "../components/Navbar";
import Spinner from "react-bootstrap/Spinner";
import { NavLink } from "react-router-dom";

function TopicListPage(props) {
  const renderTopics = () => {
    const topic = props.topics.map((elm) => {
      return (
        <div key={elm._id}>
          <h4>{elm.title}</h4>
          <NavLink to={`/topics/${elm._id}`}>More details | </NavLink>
          <NavLink to={`/topics/${elm._id}/edit`}>Edit</NavLink>
        </div>
      );
    });
    return topic;
  };

  return (
    <>
      <Navbar />
      <div>
        <h1>List of Topics</h1>
        <section>
          {props.topics === null ? <p>Loading ....</p> : renderTopics()}
        </section>
      </div>
    </>
  );
}

export default TopicListPage;
